import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMateriaDto } from './dto/create-materia.dto';
import { UpdateMateriaDto } from './dto/update-materia.dto';

@Injectable()
export class MateriaService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.materia.findMany({
      include: {
        ciclo: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.materia.findUnique({
      where: { id },
      include: {
        ciclo: true,
      },
    });
  }

  create(data: CreateMateriaDto) {
    return this.prisma.materia.create({
      data: {
        nombre: data.nombre,
        cicloId: data.cicloId,
      },
    });
  }

  update(id: number, data: UpdateMateriaDto) {
    return this.prisma.materia.update({
      where: { id },
      data,
    });
  }

  remove(id: number) {
    return this.prisma.materia.delete({
      where: { id },
    });
  }
}
