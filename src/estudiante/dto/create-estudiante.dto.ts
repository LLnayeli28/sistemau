import { IsInt, IsString } from 'class-validator';

export class CreateEstudianteDto {
  @IsString()
  nombre!: string;

  @IsInt()
  carreraId!: number;
}
