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
exports.HistorialImportacion = void 0;
const typeorm_1 = require("typeorm");
const users_entity_1 = require("../../users/entity/users.entity");
const products_entity_1 = require("../../products/entity/products.entity");
let HistorialImportacion = class HistorialImportacion {
    id;
    fecha;
    usuario;
    medicamento;
    cantidad;
    detalles;
};
exports.HistorialImportacion = HistorialImportacion;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], HistorialImportacion.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], HistorialImportacion.prototype, "fecha", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => users_entity_1.Usuario),
    __metadata("design:type", users_entity_1.Usuario)
], HistorialImportacion.prototype, "usuario", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => products_entity_1.Medicamentos),
    __metadata("design:type", products_entity_1.Medicamentos)
], HistorialImportacion.prototype, "medicamento", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], HistorialImportacion.prototype, "cantidad", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], HistorialImportacion.prototype, "detalles", void 0);
exports.HistorialImportacion = HistorialImportacion = __decorate([
    (0, typeorm_1.Entity)()
], HistorialImportacion);
//# sourceMappingURL=historial_importacion.entity.js.map