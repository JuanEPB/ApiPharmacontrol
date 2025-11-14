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
exports.Farmacia = void 0;
const typeorm_1 = require("typeorm");
const empresa_entity_1 = require("../../empresa/entities/empresa.entity");
const users_entity_1 = require("../../users/entity/users.entity");
const venta_entity_1 = require("../../venta/entities/venta.entity");
let Farmacia = class Farmacia {
    id;
    nombre;
    rfc;
    direccion;
    telefono;
    email;
    lema;
    logo_url;
    empresa;
    activo;
    fechaRegistro;
    usuarios;
    ventas;
};
exports.Farmacia = Farmacia;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Farmacia.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 120 }),
    __metadata("design:type", String)
], Farmacia.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 13 }),
    __metadata("design:type", String)
], Farmacia.prototype, "rfc", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, nullable: true }),
    __metadata("design:type", String)
], Farmacia.prototype, "direccion", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 20, nullable: true }),
    __metadata("design:type", String)
], Farmacia.prototype, "telefono", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, nullable: true }),
    __metadata("design:type", String)
], Farmacia.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, nullable: true }),
    __metadata("design:type", String)
], Farmacia.prototype, "lema", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, nullable: true }),
    __metadata("design:type", String)
], Farmacia.prototype, "logo_url", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => empresa_entity_1.Empresa, (empresa) => empresa.farmacias, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'empresa_id' }),
    __metadata("design:type", empresa_entity_1.Empresa)
], Farmacia.prototype, "empresa", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Farmacia.prototype, "activo", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'fecha_registro' }),
    __metadata("design:type", Date)
], Farmacia.prototype, "fechaRegistro", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => users_entity_1.Usuario, (usuario) => users_entity_1.Usuario.farmacia),
    __metadata("design:type", Array)
], Farmacia.prototype, "usuarios", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => venta_entity_1.Venta, (venta) => venta.farmacia),
    __metadata("design:type", Array)
], Farmacia.prototype, "ventas", void 0);
exports.Farmacia = Farmacia = __decorate([
    (0, typeorm_1.Entity)('farmacia')
], Farmacia);
//# sourceMappingURL=farmacia.entity.js.map