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
exports.EmpresaController = void 0;
const common_1 = require("@nestjs/common");
const empresa_service_1 = require("./empresa.service");
let EmpresaController = class EmpresaController {
    empresaService;
    constructor(empresaService) {
        this.empresaService = empresaService;
    }
    async findAll() {
        return await this.empresaService.findAll();
    }
    async findOne(id) {
        const empresa = await this.empresaService.findOne(id);
        if (!empresa)
            throw new common_1.NotFoundException(`Empresa con ID ${id} no encontrada`);
        return empresa;
    }
    async create(data) {
        return await this.empresaService.create(data);
    }
    async update(id, data) {
        return await this.empresaService.update(id, data);
    }
    async remove(id) {
        return await this.empresaService.remove(id);
    }
    async checkTrialStatus(id) {
        return await this.empresaService.checkTrialStatus(id);
    }
    async findActivas() {
        const empresas = await this.empresaService.findAll();
        return empresas.filter((e) => e.estado === 'activo');
    }
    async findInactivas() {
        const empresas = await this.empresaService.findAll();
        return empresas.filter((e) => e.estado === 'inactivo');
    }
};
exports.EmpresaController = EmpresaController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EmpresaController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], EmpresaController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EmpresaController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], EmpresaController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], EmpresaController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)(':id/trial-status'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], EmpresaController.prototype, "checkTrialStatus", null);
__decorate([
    (0, common_1.Get)('estado/activas'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EmpresaController.prototype, "findActivas", null);
__decorate([
    (0, common_1.Get)('estado/inactivas'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EmpresaController.prototype, "findInactivas", null);
exports.EmpresaController = EmpresaController = __decorate([
    (0, common_1.Controller)('empresas'),
    __metadata("design:paramtypes", [empresa_service_1.EmpresaService])
], EmpresaController);
//# sourceMappingURL=empresa.controller.js.map