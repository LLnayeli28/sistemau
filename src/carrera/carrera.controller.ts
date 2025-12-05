import { Controller, Get, Post, Patch, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { CarreraService } from './carrera.service';
import { CreateCarreraDto } from './dto/create-carrera.dto';
import { UpdateCarreraDto } from './dto/update-carrera.dto'; // ← esta ruta exacta

@Controller('carreras')
export class CarreraController {
  constructor(private readonly s: CarreraService) {}

  @Post()
  create(@Body() dto: CreateCarreraDto) { return this.s.create(dto); }

  @Get()
  findAll() { return this.s.findAll(); }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) { return this.s.findOne(id); }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateCarreraDto) {
    return this.s.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) { return this.s.delete(id); }
}
