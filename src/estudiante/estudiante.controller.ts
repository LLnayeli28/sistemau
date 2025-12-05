import { Controller, Get, Param, Post, Body, Patch, Delete } from '@nestjs/common';
import { EstudianteService } from './estudiante.service';

@Controller('estudiantes')
export class EstudianteController {
  constructor(private readonly estudianteService: EstudianteService) {}

  @Get()
  findAll() {
    return this.estudianteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.estudianteService.findOne(+id);
  }

  @Post()
  create(@Body() body: { nombre: string; carreraId: number }) {
    return this.estudianteService.create(body);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() body: { nombre?: string; carreraId?: number },
  ) {
    return this.estudianteService.update(+id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.estudianteService.remove(+id);
  }
}
