import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { MateriaService } from './materia.service';
import { CreateMateriaDto } from './dto/create-materia.dto';
import { UpdateMateriaDto } from './dto/update-materia.dto';

@Controller('materias')
export class MateriaController {
  constructor(private readonly materiaService: MateriaService) {}

  @Get()
  findAll() {
    return this.materiaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.materiaService.findOne(+id);
  }

  @Post()
  create(@Body() body: CreateMateriaDto) {
    return this.materiaService.create(body);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateMateriaDto) {
    return this.materiaService.update(+id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.materiaService.remove(+id);
  }
}
