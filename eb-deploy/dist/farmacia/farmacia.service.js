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
exports.FarmaciaService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const farmacia_entity_1 = require("./entities/farmacia.entity");
const empresa_entity_1 = require("../empresa/entities/empresa.entity");
const plan_service_1 = require("../plan/plan.service");
let FarmaciaService = class FarmaciaService {
    farmaciaRepo;
    empresaRepo;
    planService;
    constructor(farmaciaRepo, empresaRepo, planService) {
        this.farmaciaRepo = farmaciaRepo;
        this.empresaRepo = empresaRepo;
        this.planService = planService;
    }
    async create(dto) {
        const { empresaId, nombre, direccion, telefono } = dto;
        const empresa = await this.empresaRepo.findOne({
            where: { id: empresaId },
            relations: ['plan', 'farmacias'],
        });
        if (!empresa)
            throw new common_1.NotFoundException('La empresa especificada no existe');
        if (!empresa.plan) {
            throw new common_1.BadRequestException('La empresa no tiene un plan activo asignado');
        }
        const plan = await this.planService.findOne(empresa.plan.id);
        if (!plan)
            throw new common_1.NotFoundException('El plan asociado a la empresa no fue encontrado');
        const limite = plan.limiteFarmacias ?? 1;
        const existentes = empresa.farmacias?.length ?? 0;
        if (existentes >= limite) {
            throw new common_1.BadRequestException(`El plan "${plan.nombre}" solo permite ${limite} farmacia(s).`);
        }
        const nueva = this.farmaciaRepo.create({
            nombre,
            rfc: dto.rfc,
            direccion,
            telefono,
            email: dto.email,
            lema: dto.lema,
            logo_url: dto.logo_url,
            empresa,
            activo: true,
            fechaRegistro: new Date(),
            usuarios: [],
            ventas: [],
        });
        return this.farmaciaRepo.save(nueva);
    }
    async findAll(empresaId) {
        if (empresaId) {
            return this.farmaciaRepo.find({
                where: { empresa: { id: empresaId } },
                relations: ['empresa'],
            });
        }
        return this.farmaciaRepo.find({ relations: ['empresa'] });
    }
    async findByEmpresa(empresaId) {
        const empresa = await this.empresaRepo.findOne({ where: { id: empresaId } });
        if (!empresa)
            throw new common_1.NotFoundException('Empresa no encontrada');
        return this.farmaciaRepo.find({
            where: { empresa: { id: empresaId } },
            relations: ['empresa'],
        });
    }
    async findOne(id) {
        const farmacia = await this.farmaciaRepo.findOne({
            where: { id },
            relations: ['empresa', 'empresa.plan'],
        });
        if (!farmacia)
            throw new common_1.NotFoundException('Farmacia no encontrada');
        return farmacia;
    }
    async update(id, dto) {
        const farmacia = await this.findOne(id);
        Object.assign(farmacia, dto);
        return this.farmaciaRepo.save(farmacia);
    }
    async remove(id) {
        const farmacia = await this.findOne(id);
        return this.farmaciaRepo.remove(farmacia);
    }
};
exports.FarmaciaService = FarmaciaService;
exports.FarmaciaService = FarmaciaService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(farmacia_entity_1.Farmacia)),
    __param(1, (0, typeorm_1.InjectRepository)(empresa_entity_1.Empresa)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        plan_service_1.PlanService])
], FarmaciaService);
//# sourceMappingURL=farmacia.service.js.map