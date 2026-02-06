import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';
import type { User } from '@prisma/client';
import { CompleteOnboardingDto } from './dto/complete-onboarding.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getMe(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    return this.formatUserResponse(user);
  }

  async completeOnboarding(userId: string, dto: CompleteOnboardingDto) {
    const existingUser = await this.prisma.user.findFirst({
      where: {
        nickname: dto.nickname,
        id: { not: userId },
      },
    });

    if (existingUser) {
      throw new BadRequestException('이미 사용 중인 닉네임입니다');
    }

    const user = await this.prisma.user.update({
      where: { id: userId },
      data: {
        nickname: dto.nickname,
        defaultPart: dto.defaultPart || null,
        isOnboarded: true,
      },
    });

    return this.formatUserResponse(user);
  }

  async updateMe(userId: string, dto: UpdateUserDto) {
    if (dto.nickname) {
      const existingUser = await this.prisma.user.findFirst({
        where: {
          nickname: dto.nickname,
          id: { not: userId },
        },
      });

      if (existingUser) {
        throw new BadRequestException('이미 사용 중인 닉네임입니다');
      }
    }

    const user = await this.prisma.user.update({
      where: { id: userId },
      data: {
        ...(dto.nickname && { nickname: dto.nickname }),
        ...(dto.defaultPart !== undefined && { defaultPart: dto.defaultPart }),
        ...(dto.profileImageUrl !== undefined && { profileImageUrl: dto.profileImageUrl }),
      },
    });

    return this.formatUserResponse(user);
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
