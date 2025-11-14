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
exports.FarmaciaController = void 0;
const common_1 = require("@nestjs/common");
const farmacia_service_1 = require("./farmacia.service");
const create_farmacia_dto_1 = require("./dto/create-farmacia.dto");
const update_farmacia_dto_1 = require("./dto/update-farmacia.dto");
let FarmaciaController = class FarmaciaController {
    farmaciaService;
    constructor(farmaciaService) {
        this.farmaciaService = farmaciaService;
    }
    create(dto) {
        return this.farmaciaService.create(dto);
    }
    findAll(empresaId) {
        const id = empresaId ? Number(empresaId) : undefined;
        return this.farmaciaService.findAll(id);
    }
    findByEmpresa(empresaId) {
        return this.farmaciaService.findByEmpresa(empresaId);
    }
    findOne(id) {
        return this.farmaciaService.findOne(id);
    }
    update(id, dto) {
        return this.farmaciaService.update(id, dto);
    }
    remove(id) {
        return this.farmaciaService.remove(id);
    }
};
exports.FarmaciaController = FarmaciaController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_farmacia_dto_1.CreateFarmaciaDto]),
    __metadata("design:returntype", void 0)
], FarmaciaController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('empresaId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FarmaciaController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('empresa/:empresaId'),
    __param(0, (0, common_1.Param)('empresaId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], FarmaciaController.prototype, "findByEmpresa", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], FarmaciaController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_farmacia_dto_1.UpdateFarmaciaDto]),
    __metadata("design:returntype", void 0)
], FarmaciaController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], FarmaciaController.prototype, "remove", null);
exports.FarmaciaController = FarmaciaController = __decorate([
    (0, common_1.Controller)('farmacia'),
    __metadata("design:paramtypes", [farmacia_service_1.FarmaciaService])
], FarmaciaController);
//# sourceMappingURL=farmacia.controller.js.map