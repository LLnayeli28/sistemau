import { Controller, Get, Param, Query } from '@nestjs/common';
import { EstudianteService } from './estudiante.service';

@Controller('estudiantes')
export class EstudianteController {
  constructor(private readonly service: EstudianteService) {}

  @Get()
  findAll(@Query('page') page = 1, @Query('limit') limit = 20) {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }
}
