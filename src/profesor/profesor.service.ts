import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProfesorDto } from './dto/create-profesor.dto';
import { UpdateProfesorDto } from './dto/update-profesor.dto';

@Injectable()
export class ProfesorService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.profesor.findMany({
      include: {
        materias: {
          include: { materia: true }, // desde PMateria
        },
        carreras: {
          include: { carrera: true }, // desde CProfesor
        },
        titulos: {
          include: { titulo: true }, // desde ProfesorTitulo
        },
      },
    });
  }

  findOne(id: number) {
    return this.prisma.profesor.findUnique({
      where: { id },
      include: {
        materias: { include: { materia: true } },
        carreras: { include: { carrera: true } },
        titulos: { include: { titulo: true } },
      },
    });
  }

  create(data: CreateProfesorDto) {
    return this.prisma.profesor.create({
      data: {
        nombre: data.nombre,
      },
    });
  }

  update(id: number, data: UpdateProfesorDto) {
    return this.prisma.profesor.update({
      where: { id },
      data,
    });
  }

  remove(id: number) {
    return this.prisma.profesor.delete({
      where: { id },
    });
  }
}
