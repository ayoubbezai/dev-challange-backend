import { IsNotEmpty, IsString, IsOptional, IsInt, IsIn, MaxLength, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class HintDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsOptional()
  isOpen?: boolean;
}

export class CreateChallengeDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  title: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  subTitle?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  link?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  description: string;

  @IsString()
  @IsIn(['ps', 'ctf'])
  type: string;

  @IsOptional()
  @IsString()
  @IsIn(['easy', 'medium', 'hard'])
  difficulty?: string;

  @IsInt()
  points: number;

  @IsOptional()
  @IsString()
  flagHash?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => HintDto)
  hints?: HintDto[];
}
