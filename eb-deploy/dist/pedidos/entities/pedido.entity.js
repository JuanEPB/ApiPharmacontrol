"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pedido = void 0;
const typeorm_1 = require("typeorm");
const proveedor_entity_1 = require("../../proveedor/entity/proveedor.entity");
const farmacia_entity_1 = require("../../farmacia/entities/farmacia.entity");
const pedido_item_entity_1 = require("./pedido-item.entity");
const pedido_status_enum_1 = require("../dto/pedido-status.enum");
let Pedido = class Pedido {
    id;
    proveedor;
    farmacia;
    fechaPedido;
    fechaRecibido;
    estatus;
    total;
    items;
};
exports.Pedido = Pedido;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Pedido.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => proveedor_entity_1.Proveedor, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'proveedor_id' }),
    __metadata("design:type", proveedor_entity_1.Proveedor)
], Pedido.prototype, "proveedor", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => farmacia_entity_1.Farmacia, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'farmacia_id' }),
    __metadata("design:type", farmacia_entity_1.Farmacia)
], Pedido.prototype, "farmacia", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'fecha_pedido' }),
    __metadata("design:type", Date)
], Pedido.prototype, "fechaPedido", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'fecha_recibido', type: 'datetime', nullable: true }),
    __metadata("design:type", Object)
], Pedido.prototype, "fechaRecibido", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: pedido_status_enum_1.PedidoStatus, default: pedido_status_enum_1.PedidoStatus.ENVIADO }),
    __metadata("design:type", String)
], Pedido.prototype, "estatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 12, scale: 2, default: 0 }),
    __metadata("design:type", String)
], Pedido.prototype, "total", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => pedido_item_entity_1.PedidoItem, (i) => i.pedido, { cascade: true, eager: true }),
    __metadata("design:type", Array)
], Pedido.prototype, "items", void 0);
exports.Pedido = Pedido = __decorate([
    (0, typeorm_1.Entity)('pedidos')
], Pedido);
//# sourceMappingURL=pedido.entity.js.map