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
exports.MedicamentosController = void 0;
const common_1 = require("@nestjs/common");
const products_service_1 = require("./products.service");
const create_product_dto_1 = require("./dto/create_product.dto");
const update_medicamento_dto_1 = require("./dto/update_medicamento.dto");
let MedicamentosController = class MedicamentosController {
    medicamentosService;
    constructor(medicamentosService) {
        this.medicamentosService = medicamentosService;
    }
    async getAll() {
        return await this.medicamentosService.findAll();
    }
    async contar() {
        const total = await this.medicamentosService.contarMedicamentos();
        return { total };
    }
    async getMedicamentosCaducidad() {
        return await this.medicamentosService.dataCaducidadMedicamentos();
    }
    async getStats() {
        return this.medicamentosService.getStats();
    }
    findOne(id) {
        return this.medicamentosService.findOne(id);
    }
    create(createMedicamentoDto) {
        return this.medicamentosService.create(createMedicamentoDto);
    }
    update(id, updateMedicamentoDto) {
        return this.medicamentosService.update(id, updateMedicamentoDto);
    }
    delete(id) {
        return this.medicamentosService.delete(id);
    }
    async countByNombre(nombre) {
        const total = await this.medicamentosService.countByName(nombre);
        return { total };
    }
};
exports.MedicamentosController = MedicamentosController;
__decorate([
    (0, common_1.Get)('/all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MedicamentosController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)('count'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MedicamentosController.prototype, "contar", null);
__decorate([
    (0, common_1.Get)('caducidad'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MedicamentosController.prototype, "getMedicamentosCaducidad", null);
__decorate([
    (0, common_1.Get)('stats'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MedicamentosController.prototype, "getStats", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MedicamentosController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)('/create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_dto_1.CreateMedicamentoDto]),
    __metadata("design:returntype", void 0)
], MedicamentosController.prototype, "create", null);
__decorate([
    (0, common_1.Put)('/update/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_medicamento_dto_1.UpdateMedicamentoDto]),
    __metadata("design:returntype", Promise)
], MedicamentosController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('/delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MedicamentosController.prototype, "delete", null);
__decorate([
    (0, common_1.Get)('count/nombre/:nombre'),
    __param(0, (0, common_1.Param)('nombre')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MedicamentosController.prototype, "countByNombre", null);
exports.MedicamentosController = MedicamentosController = __decorate([
    (0, common_1.Controller)('medicamentos'),
    __metadata("design:paramtypes", [products_service_1.MedicamentosService])
], MedicamentosController);
//# sourceMappingURL=products.controller.js.map