import { Module } from '@nestjs/common';
import { TituloController } from './titulo.controller';
import { TituloService } from './titulo.service';

@Module({
  controllers: [TituloController],
  providers: [TituloService]
})
export class TituloModule {}
