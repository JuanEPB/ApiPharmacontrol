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
exports.VentaService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const venta_entity_1 = require("./entities/venta.entity");
const venta_detalle_entity_1 = require("./entities/venta_detalle.entity");
const users_entity_1 = require("../users/entity/users.entity");
const products_entity_1 = require("../products/entity/products.entity");
const documento_service_1 = require("../documento/documento.service");
const historial_exportacion_service_1 = require("../historial_exportacion/historial_exportacion.service");
let VentaService = class VentaService {
    ventaRepo;
    detalleRepo;
    medicamentoRepo;
    usuarioRepo;
    documentoService;
    historialService;
    constructor(ventaRepo, detalleRepo, medicamentoRepo, usuarioRepo, documentoService, historialService) {
        this.ventaRepo = ventaRepo;
        this.detalleRepo = detalleRepo;
        this.medicamentoRepo = medicamentoRepo;
        this.usuarioRepo = usuarioRepo;
        this.documentoService = documentoService;
        this.historialService = historialService;
    }
    async crearVenta(createVentaDto, userId) {
        const usuarioCompleto = await this.usuarioRepo.findOneBy({ id: userId });
        if (!usuarioCompleto)
            throw new common_1.NotFoundException('Usuario no encontrado');
        const detalles = [];
        for (const d of createVentaDto.detalles) {
            const medicamento = await this.medicamentoRepo.findOneBy({ id: d.medicamentoId });
            if (!medicamento)
                throw new common_1.NotFoundException('Medicamento no encontrado');
            if (medicamento.stock < d.cantidad)
                throw new common_1.NotFoundException(`Stock insuficiente para ${medicamento.nombre}`);
            medicamento.stock -= d.cantidad;
            await this.medicamentoRepo.save(medicamento);
            const detalle = this.detalleRepo.create({
                medicamento,
                cantidad: d.cantidad,
                precioUnitario: d.precioUnitario,
            });
            detalles.push(detalle);
        }
        const venta = this.ventaRepo.create({
            usuario: usuarioCompleto,
            total: createVentaDto.total,
            detalles,
        });
        const ventaGuardada = await this.ventaRepo.save(venta);
        const buffer = Buffer.from(JSON.stringify(ventaGuardada, null, 2));
        const doc = await this.documentoService.guardarDesdeBuffer(buffer, `venta_${ventaGuardada.id}.json`, 'application/json', usuarioCompleto.nombre, 'Registro de venta', 'venta');
        await this.historialService.registrar(usuarioCompleto, doc._id.toString());
        return ventaGuardada;
    }
};
exports.VentaService = VentaService;
exports.VentaService = VentaService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(venta_entity_1.Venta)),
    __param(1, (0, typeorm_1.InjectRepository)(venta_detalle_entity_1.VentaDetalle)),
    __param(2, (0, typeorm_1.InjectRepository)(products_entity_1.Medicamentos)),
    __param(3, (0, typeorm_1.InjectRepository)(users_entity_1.Usuario)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        documento_service_1.DocumentoService,
        historial_exportacion_service_1.HistorialExportacionService])
], VentaService);
//# sourceMappingURL=venta.service.js.map