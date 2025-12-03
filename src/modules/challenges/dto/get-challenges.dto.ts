// src/modules/challenges/dto/get-challenges.dto.ts
import { IsOptional, IsNumber, Min, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class GetChallengesDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  limit?: number = 10;

  @IsOptional()
  @IsString()
  type?: 'ps' | 'ctf';

  @IsOptional()
  @IsString()
  difficulty?: 'easy' | 'medium' | 'hard';
}
