import { IsEnum } from 'class-validator';
import { PedidoStatus } from './pedido-status.enum';

export class UpdateStatusDto {
  @IsEnum(PedidoStatus)
  estatus: PedidoStatus;
}
