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
exports.EmpresaService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const empresa_entity_1 = require("./entities/empresa.entity");
const plan_entity_1 = require("../plan/entities/plan.entity");
const suscripcion_entity_1 = require("../suscripcion/entities/suscripcion.entity");
let EmpresaService = class EmpresaService {
    empresaRepo;
    planRepo;
    suscripcionRepo;
    constructor(empresaRepo, planRepo, suscripcionRepo) {
        this.empresaRepo = empresaRepo;
        this.planRepo = planRepo;
        this.suscripcionRepo = suscripcionRepo;
    }
    async findAll() {
        return await this.empresaRepo.find({ relations: ['plan', 'farmacias', 'suscripciones'] });
    }
    async findOne(id) {
        const empresa = await this.empresaRepo.findOne({
            where: { id },
            relations: ['plan', 'farmacias', 'suscripciones'],
        });
        if (!empresa)
            throw new common_1.NotFoundException(`Empresa con ID ${id} no encontrada`);
        return empresa;
    }
    async create(data) {
        if (!data || !data.planId) {
            throw new common_1.NotFoundException('Debe proporcionar un planId válido en el cuerpo de la solicitud');
        }
        const plan = await this.planRepo.findOne({ where: { id: data.planId } });
        if (!plan)
            throw new common_1.NotFoundException('Plan no encontrado');
        const empresa = this.empresaRepo.create({
            nombre: data.nombre,
            rfc: data.rfc,
            direccion: data.direccion || null,
            telefono_contacto: data.telefono_contacto || null,
            email_contacto: data.email_contacto || null,
            plan: plan,
            estado: 'activo',
            fecha_registro: new Date(),
        });
        if (plan.periodo_prueba_dias && plan.nombre === 'Demo') {
            const finPrueba = new Date();
            finPrueba.setDate(finPrueba.getDate() + plan.periodo_prueba_dias);
            empresa.fecha_expiracion = finPrueba;
        }
        else {
            empresa.fecha_expiracion = data.fecha_expiracion || null;
        }
        const savedEmpresa = await this.empresaRepo.save(empresa);
        const suscripcion = this.suscripcionRepo.create({
            empresa: savedEmpresa,
            plan: plan,
            estado_pago: 'pendiente',
            activa: true,
            monto_pagado: 0,
            fecha_inicio: new Date(),
            fecha_fin: empresa.fecha_expiracion,
            creado_en: new Date(),
            actualizado_en: new Date(),
        });
        await this.suscripcionRepo.save(suscripcion);
        return { ...savedEmpresa, suscripcion };
    }
    async update(id, data) {
        const empresa = await this.findOne(id);
        Object.assign(empresa, data);
        return this.empresaRepo.save(empresa);
    }
    async remove(id) {
        const empresa = await this.findOne(id);
        return this.empresaRepo.remove(empresa);
    }
    async checkTrialStatus(id) {
        const empresa = await this.findOne(id);
        if (!empresa.fecha_expiracion) {
            return { enPrueba: false };
        }
        const hoy = new Date();
        const fin = new Date(empresa.fecha_expiracion);
        const enPrueba = hoy <= fin;
        const diasRestantes = enPrueba
            ? Math.ceil((fin.getTime() - hoy.getTime()) / (1000 * 3600 * 24))
            : 0;
        return {
            enPrueba,
            diasRestantes,
            fechaFin: fin.toISOString().split('T')[0],
        };
    }
};
exports.EmpresaService = EmpresaService;
exports.EmpresaService = EmpresaService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(empresa_entity_1.Empresa)),
    __param(1, (0, typeorm_1.InjectRepository)(plan_entity_1.Plan)),
    __param(2, (0, typeorm_1.InjectRepository)(suscripcion_entity_1.Suscripcion)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], EmpresaService);
//# sourceMappingURL=empresa.service.js.map