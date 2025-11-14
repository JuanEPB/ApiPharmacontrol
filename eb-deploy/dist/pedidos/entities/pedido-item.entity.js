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
exports.PedidoItem = void 0;
const typeorm_1 = require("typeorm");
const pedido_entity_1 = require("./pedido.entity");
const products_entity_1 = require("../../products/entity/products.entity");
let PedidoItem = class PedidoItem {
    id;
    pedido;
    medicamento;
    cantidad;
    precioUnitario;
    subtotal;
    lote;
    fechaCaducidad;
};
exports.PedidoItem = PedidoItem;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], PedidoItem.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => pedido_entity_1.Pedido, (p) => p.items, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'pedido_id' }),
    __metadata("design:type", pedido_entity_1.Pedido)
], PedidoItem.prototype, "pedido", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => products_entity_1.Medicamentos, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'medicamento_id' }),
    __metadata("design:type", products_entity_1.Medicamentos)
], PedidoItem.prototype, "medicamento", void 0);
__decorate([
    (0, typeorm_1.Column)('int'),
    __metadata("design:type", Number)
], PedidoItem.prototype, "cantidad", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'precio_unitario', type: 'decimal', precision: 12, scale: 2 }),
    __metadata("design:type", String)
], PedidoItem.prototype, "precioUnitario", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 12, scale: 2 }),
    __metadata("design:type", String)
], PedidoItem.prototype, "subtotal", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], PedidoItem.prototype, "lote", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'fecha_caducidad', type: 'date', nullable: true }),
    __metadata("design:type", String)
], PedidoItem.prototype, "fechaCaducidad", void 0);
exports.PedidoItem = PedidoItem = __decorate([
    (0, typeorm_1.Entity)('pedido_items')
], PedidoItem);
//# sourceMappingURL=pedido-item.entity.js.map