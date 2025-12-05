import { IsOptional, IsString } from 'class-validator';

export class UpdateCarreraDto {
  @IsOptional()
  @IsString()
  nombre?: string;
}
