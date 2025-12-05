import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProfesorService } from './profesor.service';
import { CreateProfesorDto } from './dto/create-profesor.dto';
import { UpdateProfesorDto } from './dto/update-profesor.dto';

@Controller('profesores')
export class ProfesorController {
  constructor(private readonly profesorService: ProfesorService) {}

  @Get()
  findAll() {
    return this.profesorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.profesorService.findOne(+id);
  }

  @Post()
  create(@Body() body: CreateProfesorDto) {
    return this.profesorService.create(body);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateProfesorDto) {
    return this.profesorService.update(+id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.profesorService.remove(+id);
  }
}
