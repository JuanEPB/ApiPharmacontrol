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
exports.HistorialExportacion = void 0;
const typeorm_1 = require("typeorm");
const users_entity_1 = require("../../users/entity/users.entity");
let HistorialExportacion = class HistorialExportacion {
    id;
    fecha;
    usuario;
    documento;
};
exports.HistorialExportacion = HistorialExportacion;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], HistorialExportacion.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], HistorialExportacion.prototype, "fecha", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => users_entity_1.Usuario, { eager: true }),
    __metadata("design:type", users_entity_1.Usuario)
], HistorialExportacion.prototype, "usuario", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], HistorialExportacion.prototype, "documento", void 0);
exports.HistorialExportacion = HistorialExportacion = __decorate([
    (0, typeorm_1.Entity)()
], HistorialExportacion);
//# sourceMappingURL=historial_exportacion.entity.js.map