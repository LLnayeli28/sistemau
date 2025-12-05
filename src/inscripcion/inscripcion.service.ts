import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateInscripcionDto } from './dto/create-inscripcion.dto';
import { UpdateInscripcionDto } from './dto/update-inscripcion.dto';

@Injectable()
export class InscripcionService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.inscripcion.findMany({
      include: { estudiante: true, materia: true },
    });
  }

  async findOne(id: number) {
    const insc = await this.prisma.inscripcion.findUnique({
      where: { id },
      include: { estudiante: true, materia: true },
    });
    if (!insc) throw new NotFoundException('Inscripción no encontrada');
    return insc;
  }

  async create(dto: CreateInscripcionDto) {
    return this.prisma.inscripcion.create({
      data: {
        estudiante: { connect: { id: dto.estudianteId } },
        materia: { connect: { id: dto.materiaId } },
        ...(dto.fecha && { fecha: dto.fecha }),
      },
      include: { estudiante: true, materia: true },
    });
  }

  async update(id: number, dto: UpdateInscripcionDto) {
    return this.prisma.inscripcion.update({
      where: { id },
      data: {
        ...(dto.estudianteId && { estudiante: { connect: { id: dto.estudianteId } } }),
        ...(dto.materiaId && { materia: { connect: { id: dto.materiaId } } }),
        ...(dto.fecha && { fecha: dto.fecha }),
      },
      include: { estudiante: true, materia: true },
    });
  }

  async remove(id: number) {
    return this.prisma.inscripcion.delete({ where: { id } });
  }
}
