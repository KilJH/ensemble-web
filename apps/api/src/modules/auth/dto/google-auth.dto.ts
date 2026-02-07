import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class GoogleAuthDto {
  @IsString()
  @IsNotEmpty()
  code!: string;

  @IsUrl({ require_tld: false })
  @IsOptional()
  redirectUri?: string;
}
