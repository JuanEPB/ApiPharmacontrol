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
exports.HistorialExportacionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const historial_exportacion_entity_1 = require("./entity/historial_exportacion.entity");
const users_entity_1 = require("../users/entity/users.entity");
let HistorialExportacionService = class HistorialExportacionService {
    historialRepo;
    usuarioRepo;
    constructor(historialRepo, usuarioRepo) {
        this.historialRepo = historialRepo;
        this.usuarioRepo = usuarioRepo;
    }
    async findAll() {
        return this.historialRepo.find({ relations: ['usuario'], order: { fecha: 'DESC' } });
    }
    async findOne(id) {
        return this.historialRepo.findOne({ where: { id }, relations: ['usuario'] });
    }
    async findByFecha(fechaInicio, fechaFin) {
        return this.historialRepo.find({
            where: {
                fecha: (0, typeorm_2.Between)(fechaInicio, fechaFin),
            },
            relations: ['usuario'],
            order: { fecha: 'DESC' },
        });
    }
    async findByNombreUsuario(nombre) {
        return this.historialRepo.find({
            relations: ['usuario'],
            where: {
                usuario: {
                    nombre: (0, typeorm_2.Like)(`%${nombre}%`),
                },
            },
            order: { fecha: 'DESC' },
        });
    }
    async findByUsuarioId(usuarioId) {
        return this.historialRepo.find({
            where: { usuario: { id: usuarioId } },
            relations: ['usuario'],
            order: { fecha: 'DESC' },
        });
    }
    async findbyiddocumento(documentoId) {
        return this.historialRepo.find({
            where: { documento: documentoId },
            relations: ['usuario'],
            order: { fecha: 'DESC' },
        });
    }
    async registrar(usuario, documentoId) {
        const historial = new historial_exportacion_entity_1.HistorialExportacion();
        historial.documento = documentoId;
        historial.usuario = { id: usuario.id };
        console.log('Historial a guardar:', historial);
        return this.historialRepo.save(historial);
    }
};
exports.HistorialExportacionService = HistorialExportacionService;
exports.HistorialExportacionService = HistorialExportacionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(historial_exportacion_entity_1.HistorialExportacion)),
    __param(1, (0, typeorm_1.InjectRepository)(users_entity_1.Usuario)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], HistorialExportacionService);
//# sourceMappingURL=historial_exportacion.service.js.map