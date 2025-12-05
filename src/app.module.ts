import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { EstudianteModule } from './estudiante/estudiante.module';
import { ProfesorModule } from './profesor/profesor.module';
import { CarreraModule } from './carrera/carrera.module';
import { MateriaModule } from './materia/materia.module';
import { InscripcionModule } from './inscripcion/inscripcion.module';
import { UsuarioModule } from './usuario/usuario.module';
import { CicloModule } from './ciclo/ciclo.module';
import { PeriodoModule } from './periodo/periodo.module';
import { HorarioModule } from './horario/horario.module';
import { TituloModule } from './titulo/titulo.module';

@Module({
  imports: [
    PrismaModule,
    EstudianteModule,
    ProfesorModule,
    CarreraModule,
    MateriaModule,
    InscripcionModule,
    UsuarioModule,
    CicloModule,
    PeriodoModule,
    HorarioModule,
    TituloModule,
  ],
})
export class AppModule {}
