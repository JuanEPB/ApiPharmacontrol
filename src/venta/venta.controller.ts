import { Controller, Post, Body, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { VentaService } from './venta.service';
import { CreateVentaDto } from './dto/create-venta.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserId } from 'src/auth/user.decorator';

@Controller('venta')
export class VentaController {
  constructor(private readonly ventaService: VentaService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async crearVenta(@Body() dto: CreateVentaDto, @UserId() userId: number) {
    return this.ventaService.crearVenta(dto, userId);
  }
}
