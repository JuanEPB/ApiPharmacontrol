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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HistorialExportacionController = void 0;
const common_1 = require("@nestjs/common");
const historial_exportacion_service_1 = require("./historial_exportacion.service");
let HistorialExportacionController = class HistorialExportacionController {
    historialService;
    constructor(historialService) {
        this.historialService = historialService;
    }
    findAll() {
        return this.historialService.findAll();
    }
    async findByFecha(inicio, fin) {
        if (!inicio || !fin) {
            throw new common_1.BadRequestException('Debe enviar las fechas inicio y fin');
        }
        const fechaInicio = new Date(inicio);
        const fechaFin = new Date(fin);
        return this.historialService.findByFecha(fechaInicio, fechaFin);
    }
    findByNombreUsuario(nombre) {
        if (!nombre) {
            throw new common_1.BadRequestException('Debe enviar el nombre de usuario');
        }
        return this.historialService.findByNombreUsuario(nombre);
    }
    findByUsuarioId(usuarioId) {
        return this.historialService.findByUsuarioId(usuarioId);
    }
    findByDocumentoId(documentoId) {
        return this.historialService.findbyiddocumento(documentoId);
    }
    findOne(id) {
        return this.historialService.findOne(id);
    }
};
exports.HistorialExportacionController = HistorialExportacionController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HistorialExportacionController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('por-fecha'),
    __param(0, (0, common_1.Query)('inicio')),
    __param(1, (0, common_1.Query)('fin')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], HistorialExportacionController.prototype, "findByFecha", null);
__decorate([
    (0, common_1.Get)('por-nombre/:nombre'),
    __param(0, (0, common_1.Param)('nombre')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HistorialExportacionController.prototype, "findByNombreUsuario", null);
__decorate([
    (0, common_1.Get)('por-usuario/:usuarioId'),
    __param(0, (0, common_1.Param)('usuarioId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], HistorialExportacionController.prototype, "findByUsuarioId", null);
__decorate([
    (0, common_1.Get)('por-documento/:documentoId'),
    __param(0, (0, common_1.Param)('documentoId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HistorialExportacionController.prototype, "findByDocumentoId", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], HistorialExportacionController.prototype, "findOne", null);
exports.HistorialExportacionController = HistorialExportacionController = __decorate([
    (0, common_1.Controller)('historial-exportacion'),
    __metadata("design:paramtypes", [historial_exportacion_service_1.HistorialExportacionService])
], HistorialExportacionController);
//# sourceMappingURL=historial_exportacion.controller.js.map