import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { PartCategory } from '@prisma/client';

export class CompleteOnboardingDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2, { message: '닉네임은 2자 이상이어야 합니다' })
  @MaxLength(20, { message: '닉네임은 20자 이하여야 합니다' })
  @Matches(/^[가-힣a-zA-Z0-9_]+$/, {
    message: '닉네임은 한글, 영문, 숫자, 밑줄만 사용 가능합니다',
  })
  nickname!: string;

  @IsEnum(PartCategory)
  @IsOptional()
  defaultPart?: PartCategory;
}
