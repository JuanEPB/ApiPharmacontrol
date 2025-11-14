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
exports.ConfiguracionEmpresa = void 0;
const typeorm_1 = require("typeorm");
const empresa_entity_1 = require("../../empresa/entities/empresa.entity");
let ConfiguracionEmpresa = class ConfiguracionEmpresa {
    id;
    empresa;
    logo_url;
    lema;
    color_primario;
    color_secundario;
    mostrar_marca;
    fecha_creacion;
    fecha_actualizacion;
};
exports.ConfiguracionEmpresa = ConfiguracionEmpresa;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ConfiguracionEmpresa.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => empresa_entity_1.Empresa, { eager: true, onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'empresa_id' }),
    __metadata("design:type", empresa_entity_1.Empresa)
], ConfiguracionEmpresa.prototype, "empresa", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ConfiguracionEmpresa.prototype, "logo_url", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ConfiguracionEmpresa.prototype, "lema", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ConfiguracionEmpresa.prototype, "color_primario", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ConfiguracionEmpresa.prototype, "color_secundario", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], ConfiguracionEmpresa.prototype, "mostrar_marca", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ConfiguracionEmpresa.prototype, "fecha_creacion", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], ConfiguracionEmpresa.prototype, "fecha_actualizacion", void 0);
exports.ConfiguracionEmpresa = ConfiguracionEmpresa = __decorate([
    (0, typeorm_1.Entity)('configuracion_empresa')
], ConfiguracionEmpresa);
//# sourceMappingURL=configuracion.entity.js.map