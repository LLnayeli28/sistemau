import { Module } from '@nestjs/common';
import { InscripcionController } from './inscripcion.controller';
import { InscripcionService } from './inscripcion.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [InscripcionController],
  providers: [InscripcionService],
})
export class InscripcionModule {}
