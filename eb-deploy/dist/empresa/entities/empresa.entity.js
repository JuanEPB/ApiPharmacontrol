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
exports.Empresa = void 0;
const typeorm_1 = require("typeorm");
const farmacia_entity_1 = require("../../farmacia/entities/farmacia.entity");
const suscripcion_entity_1 = require("../../suscripcion/entities/suscripcion.entity");
const plan_entity_1 = require("../../plan/entities/plan.entity");
let Empresa = class Empresa {
    id;
    nombre;
    rfc;
    direccion;
    email_contacto;
    telefono_contacto;
    plan;
    estado;
    fecha_registro;
    fecha_expiracion;
    farmacias;
    suscripciones;
};
exports.Empresa = Empresa;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Empresa.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 120 }),
    __metadata("design:type", String)
], Empresa.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 13, unique: true }),
    __metadata("design:type", String)
], Empresa.prototype, "rfc", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, nullable: true }),
    __metadata("design:type", String)
], Empresa.prototype, "direccion", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, nullable: true }),
    __metadata("design:type", String)
], Empresa.prototype, "email_contacto", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 20, nullable: true }),
    __metadata("design:type", String)
], Empresa.prototype, "telefono_contacto", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => plan_entity_1.Plan, (plan) => plan.empresas, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'plan_id' }),
    __metadata("design:type", plan_entity_1.Plan)
], Empresa.prototype, "plan", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'activo' }),
    __metadata("design:type", String)
], Empresa.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Empresa.prototype, "fecha_registro", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], Empresa.prototype, "fecha_expiracion", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => farmacia_entity_1.Farmacia, (farmacia) => farmacia.empresa),
    __metadata("design:type", Array)
], Empresa.prototype, "farmacias", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => suscripcion_entity_1.Suscripcion, (suscripcion) => suscripcion.empresa),
    __metadata("design:type", Array)
], Empresa.prototype, "suscripciones", void 0);
exports.Empresa = Empresa = __decorate([
    (0, typeorm_1.Entity)('empresa')
], Empresa);
//# sourceMappingURL=empresa.entity.js.map