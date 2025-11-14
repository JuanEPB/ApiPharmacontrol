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
exports.Medicamentos = void 0;
const typeorm_1 = require("typeorm");
const categorias_entity_1 = require("../../categorias/entity/categorias.entity");
const proveedor_entity_1 = require("../../proveedor/entity/proveedor.entity");
let Medicamentos = class Medicamentos {
    id;
    nombre;
    lote;
    caducidad;
    proveedor;
    stock;
    precio;
    categoria;
};
exports.Medicamentos = Medicamentos;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Medicamentos.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], Medicamentos.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50 }),
    __metadata("design:type", String)
], Medicamentos.prototype, "lote", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], Medicamentos.prototype, "caducidad", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => proveedor_entity_1.Proveedor, proveedor => proveedor.medicamentos, { nullable: true, eager: true }),
    __metadata("design:type", proveedor_entity_1.Proveedor)
], Medicamentos.prototype, "proveedor", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Medicamentos.prototype, "stock", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], Medicamentos.prototype, "precio", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => categorias_entity_1.Categoria, categoria => categoria.medicamentos, { nullable: true, eager: true }),
    __metadata("design:type", categorias_entity_1.Categoria)
], Medicamentos.prototype, "categoria", void 0);
exports.Medicamentos = Medicamentos = __decorate([
    (0, typeorm_1.Entity)('medicamentos')
], Medicamentos);
//# sourceMappingURL=products.entity.js.map