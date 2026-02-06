import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { google, Auth } from 'googleapis';
import { randomUUID } from 'crypto';
import { PrismaService } from '../../common/prisma.service';
import type { JwtPayload } from '../../common/strategies/jwt.strategy';
import type { User } from '@prisma/client';

@Injectable()
export class AuthService {
  private oauth2Client: Auth.OAuth2Client;

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {
    this.oauth2Client = new google.auth.OAuth2(
      config.get('GOOGLE_CLIENT_ID'),
      config.get('GOOGLE_CLIENT_SECRET'),
    );
  }

  async authenticateWithGoogle(code: string, redirectUri?: string) {
    const actualRedirectUri = redirectUri || this.config.get('GOOGLE_REDIRECT_URI');

    try {
      const { tokens } = await this.oauth2Client.getToken({
        code,
        redirect_uri: actualRedirectUri,
      });

      if (!tokens.id_token) {
        throw new UnauthorizedException('Failed to get ID token from Google');
      }

      const ticket = await this.oauth2Client.verifyIdToken({
        idToken: tokens.id_token,
        audience: this.config.get('GOOGLE_CLIENT_ID'),
      });

      const payload = ticket.getPayload();
      if (!payload || !payload.sub || !payload.email) {
        throw new UnauthorizedException('Invalid Google token payload');
      }

      const user = await this.prisma.user.upsert({
        where: { googleId: payload.sub },
        update: {
          email: payload.email,
          profileImageUrl: payload.picture || null,
        },
        create: {
          googleId: payload.sub,
          email: payload.email,
          profileImageUrl: payload.picture || null,
          isOnboarded: false,
        },
      });

      const accessToken = this.generateAccessToken(user);
      const refreshToken = await this.generateRefreshToken(user.id);

      return {
        user: this.formatUserResponse(user),
        accessToken,
        refreshToken,
      };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new UnauthorizedException('Google authentication failed');
    }
  }

  async refreshAccessToken(refreshTokenValue: string) {
    const storedToken = await this.prisma.refreshToken.findUnique({
      where: { token: refreshTokenValue },
      include: { user: true },
    });

    if (!storedToken) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    if (new Date() > storedToken.expiresAt) {
      await this.prisma.refreshToken.delete({
        where: { id: storedToken.id },
      });
      throw new UnauthorizedException('Refresh token expired');
    }

    // Token rotation: delete old token and create new one
    await this.prisma.refreshToken.delete({
      where: { id: storedToken.id },
    });

    const accessToken = this.generateAccessToken(storedToken.user);
    const newRefreshToken = await this.generateRefreshToken(storedToken.user.id);

    return {
      user: this.formatUserResponse(storedToken.user),
      accessToken,
      refreshToken: newRefreshToken,
    };
  }

  async logout(userId: string, refreshTokenValue?: string) {
    if (refreshTokenValue) {
      await this.prisma.refreshToken.deleteMany({
        where: { token: refreshTokenValue },
      });
    } else {
      await this.prisma.refreshToken.deleteMany({
        where: { userId },
      });
    }
  }

  private generateAccessToken(user: User): string {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      userType: user.userType,
      isOnboarded: user.isOnboarded,
    };

    return this.jwtService.sign(payload);
  }

  private async generateRefreshToken(userId: string): Promise<string> {
    const token = randomUUID();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await this.prisma.refreshToken.create({
      data: {
        token,
        userId,
        expiresAt,
      },
    });

    return token;
  }

  private formatUserResponse(user: User) {
    return {
      id: user.id,
      email: user.email,
      nickname: user.nickname,
      profileImageUrl: user.profileImageUrl,
      defaultPart: user.defaultPart,
      userType: user.userType,
      isOnboarded: user.isOnboarded,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    };
  }
}
