import { IsInt, IsOptional, IsString } from 'class-validator';
export class CreateInscripcionDto {
  @IsInt() estudianteId!: number;
  @IsInt() materiaId!: number;
  @IsOptional() fecha?: Date;
  @IsOptional() @IsString() nombre?: string;
  @IsOptional() @IsString() descripcion?: string;
}
