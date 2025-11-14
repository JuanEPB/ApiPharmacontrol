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
exports.SuscripcionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const suscripcion_entity_1 = require("./entities/suscripcion.entity");
const empresa_entity_1 = require("../empresa/entities/empresa.entity");
const plan_entity_1 = require("../plan/entities/plan.entity");
const date_fns_1 = require("date-fns");
let SuscripcionService = class SuscripcionService {
    suscripcionRepo;
    empresaRepo;
    planRepo;
    constructor(suscripcionRepo, empresaRepo, planRepo) {
        this.suscripcionRepo = suscripcionRepo;
        this.empresaRepo = empresaRepo;
        this.planRepo = planRepo;
    }
    async crearSuscripcionInicial(empresaId, planNombre) {
        const empresa = await this.empresaRepo.findOne({ where: { id: empresaId } });
        if (!empresa)
            throw new common_1.NotFoundException('Empresa no encontrada');
        const plan = await this.planRepo.findOne({ where: { nombre: planNombre } });
        if (!plan)
            throw new common_1.NotFoundException('Plan no encontrado');
        const hoy = new Date();
        const fin = (0, date_fns_1.addDays)(hoy, 30);
        const suscripcion = this.suscripcionRepo.create({
            empresa,
            plan,
            fecha_inicio: hoy,
            fecha_fin: fin,
            activa: true,
            monto_pagado: 0,
            estado_pago: 'pendiente',
        });
        const nueva = await this.suscripcionRepo.save(suscripcion);
        empresa.plan = plan;
        await this.empresaRepo.save(empresa);
        return nueva;
    }
    async renovarSuscripcion(empresaId, dias) {
        const empresa = await this.empresaRepo.findOne({ where: { id: empresaId } });
        if (!empresa)
            throw new common_1.NotFoundException('Empresa no encontrada');
        const activa = await this.suscripcionRepo.findOne({
            where: { empresa: { id: empresaId }, activa: true },
        });
        if (!activa)
            throw new common_1.NotFoundException('No hay suscripción activa');
        activa.fecha_fin = (0, date_fns_1.addDays)(new Date(activa.fecha_fin), dias);
        await this.suscripcionRepo.save(activa);
        return activa;
    }
    async verificarSuscripcionesVencidas() {
        const hoy = new Date();
        const vencidas = await this.suscripcionRepo
            .createQueryBuilder('s')
            .where('s.fecha_fin < :hoy AND s.activa = true', { hoy })
            .getMany();
        for (const sub of vencidas) {
            sub.activa = false;
            await this.suscripcionRepo.save(sub);
        }
        return vencidas.length;
    }
};
exports.SuscripcionService = SuscripcionService;
exports.SuscripcionService = SuscripcionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(suscripcion_entity_1.Suscripcion)),
    __param(1, (0, typeorm_1.InjectRepository)(empresa_entity_1.Empresa)),
    __param(2, (0, typeorm_1.InjectRepository)(plan_entity_1.Plan)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], SuscripcionService);
//# sourceMappingURL=suscripcion.service.js.map