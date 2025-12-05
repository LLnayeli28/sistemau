import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EstudianteService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.estudiante.findMany({
      include: { carrera: true },
    });
  }

  findOne(id: number) {
    return this.prisma.estudiante.findUnique({
      where: { id },
      include: { carrera: true },
    });
  }

  create(data: { nombre: string; carreraId: number }) {
    return this.prisma.estudiante.create({ data });
  }

  update(id: number, data: { nombre?: string; carreraId?: number }) {
    return this.prisma.estudiante.update({
      where: { id },
      data,
    });
  }

  remove(id: number) {
    return this.prisma.estudiante.delete({ where: { id } });
  }
}
