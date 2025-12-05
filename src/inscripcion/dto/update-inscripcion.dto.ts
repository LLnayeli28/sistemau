import { IsInt, IsOptional, IsString } from 'class-validator';
export class UpdateInscripcionDto {
  @IsOptional() @IsInt() estudianteId?: number;
  @IsOptional() @IsInt() materiaId?: number;
  @IsOptional() fecha?: Date;
  @IsOptional() @IsString() nombre?: string;
  @IsOptional() @IsString() descripcion?: string;
}
