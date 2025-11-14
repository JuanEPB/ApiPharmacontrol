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
exports.ConfiguracionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const configuracion_entity_1 = require("./entities/configuracion.entity");
const empresa_entity_1 = require("../empresa/entities/empresa.entity");
let ConfiguracionService = class ConfiguracionService {
    configRepo;
    empresaRepo;
    constructor(configRepo, empresaRepo) {
        this.configRepo = configRepo;
        this.empresaRepo = empresaRepo;
    }
    async crear(dto) {
        const empresa = await this.empresaRepo.findOne({ where: { id: dto.empresa_id } });
        if (!empresa)
            throw new common_1.NotFoundException('Empresa no encontrada');
        const existente = await this.configRepo.findOne({ where: { empresa: { id: empresa.id } } });
        if (existente)
            throw new common_1.NotFoundException('Esta empresa ya tiene una configuración creada');
        const nueva = this.configRepo.create({
            empresa,
            logo_url: dto.logo_url,
            lema: dto.lema,
            color_primario: dto.color_primario,
            color_secundario: dto.color_secundario,
            mostrar_marca: dto.mostrar_marca ?? true,
        });
        return this.configRepo.save(nueva);
    }
    async obtenerPorEmpresa(empresaId) {
        const config = await this.configRepo.findOne({
            where: { empresa: { id: empresaId } },
        });
        if (!config)
            throw new common_1.NotFoundException('Configuración no encontrada');
        return config;
    }
    async actualizar(id, dto) {
        const config = await this.configRepo.findOne({ where: { id } });
        if (!config)
            throw new common_1.NotFoundException('Configuración no encontrada');
        Object.assign(config, dto);
        return this.configRepo.save(config);
    }
};
exports.ConfiguracionService = ConfiguracionService;
exports.ConfiguracionService = ConfiguracionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(configuracion_entity_1.ConfiguracionEmpresa)),
    __param(1, (0, typeorm_1.InjectRepository)(empresa_entity_1.Empresa)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ConfiguracionService);
//# sourceMappingURL=configuracion.service.js.map