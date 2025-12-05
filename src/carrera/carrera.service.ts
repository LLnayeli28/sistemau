import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCarreraDto } from './dto/create-carrera.dto';
import { UpdateCarreraDto } from './dto/update-carrera.dto';

@Injectable()
export class CarreraService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.carrera.findMany({
      include: { materias: true, estudiantes: true, profesores: true },
    });
  }

  async findOne(id: number) {
    const carrera = await this.prisma.carrera.findUnique({
      where: { id },
      include: { materias: true, estudiantes: true, profesores: true },
    });

    if (!carrera) {
      throw new NotFoundException(`Carrera con ID ${id} no encontrada`);
    }

    return carrera;
  }

  async create(data: CreateCarreraDto) {
    return this.prisma.carrera.create({ data });
  }

update(id: number, dto: UpdateCarreraDto) {
  return this.prisma.carrera.update({
    where: { id },
    data: {
      ...(dto.nombre && { nombre: dto.nombre }),
    },
  });
}


  async delete(id: number) {
    const carrera = await this.prisma.carrera.findUnique({ where: { id } });
    if (!carrera) {
      throw new NotFoundException(`Carrera con ID ${id} no encontrada`);
    }

    return this.prisma.carrera.delete({
      where: { id },
    });
  }
}
