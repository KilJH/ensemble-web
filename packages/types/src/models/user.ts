// ========== Enums ==========

export type UserType = 'REGULAR' | 'SERVICE_ADMIN';

export type PartCategory =
  | 'VOCAL'
  | 'GUITAR'
  | 'BASS'
  | 'DRUMS'
  | 'KEYS'
  | 'BRASS'
  | 'STRINGS'
  | 'PERCUSSION'
  | 'OTHER';

// ========== Models ==========

export interface User {
  id: string;
  googleId: string;
  email: string;
  nickname: string | null;
  profileImageUrl: string | null;
  defaultPart: PartCategory | null;
  userType: UserType;
  isOnboarded: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// ========== DTOs ==========

export interface CompleteOnboardingDto {
  nickname: string;
  defaultPart?: PartCategory;
}

export interface UpdateUserDto {
  nickname?: string;
  defaultPart?: PartCategory;
  profileImageUrl?: string;
}

// ========== Responses ==========

export interface UserResponse {
  id: string;
  email: string;
  nickname: string | null;
  profileImageUrl: string | null;
  defaultPart: PartCategory | null;
  userType: UserType;
  isOnboarded: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  user: UserResponse;
  accessToken: string;
}
