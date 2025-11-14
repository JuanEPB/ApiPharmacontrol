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
exports.VentaDetalle = void 0;
const typeorm_1 = require("typeorm");
const venta_entity_1 = require("./venta.entity");
const products_entity_1 = require("../../products/entity/products.entity");
let VentaDetalle = class VentaDetalle {
    id;
    venta;
    medicamento;
    cantidad;
    precioUnitario;
};
exports.VentaDetalle = VentaDetalle;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], VentaDetalle.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => venta_entity_1.Venta, venta => venta.detalles),
    __metadata("design:type", venta_entity_1.Venta)
], VentaDetalle.prototype, "venta", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => products_entity_1.Medicamentos, { eager: true }),
    __metadata("design:type", products_entity_1.Medicamentos)
], VentaDetalle.prototype, "medicamento", void 0);
__decorate([
    (0, typeorm_1.Column)('int'),
    __metadata("design:type", Number)
], VentaDetalle.prototype, "cantidad", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], VentaDetalle.prototype, "precioUnitario", void 0);
exports.VentaDetalle = VentaDetalle = __decorate([
    (0, typeorm_1.Entity)()
], VentaDetalle);
//# sourceMappingURL=venta_detalle.entity.js.map