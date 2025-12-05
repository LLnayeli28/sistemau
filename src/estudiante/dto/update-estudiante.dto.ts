import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateEstudianteDto {
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsInt()
  carreraId?: number;
}
