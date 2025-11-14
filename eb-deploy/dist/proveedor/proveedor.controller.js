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
exports.ProveedorController = void 0;
const common_1 = require("@nestjs/common");
const proveedor_service_1 = require("./proveedor.service");
const update_proveedor_dto_1 = require("./dto/update-proveedor.dto");
let ProveedorController = class ProveedorController {
    proveedorService;
    constructor(proveedorService) {
        this.proveedorService = proveedorService;
    }
    async getAll() {
        return await this.proveedorService.getAll();
    }
    async getById(id) {
        return await this.proveedorService.getById(id);
    }
    update(id, UpdateProvedorDto) {
        return this.proveedorService.update(id, UpdateProvedorDto);
    }
    delete(id) {
        return this.proveedorService.delete(id);
    }
    findMedicamentos(id) {
        return this.proveedorService.findMedicamentos(id);
    }
};
exports.ProveedorController = ProveedorController;
__decorate([
    (0, common_1.Get)('/all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProveedorController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProveedorController.prototype, "getById", null);
__decorate([
    (0, common_1.Put)('/update/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_proveedor_dto_1.UpdateProvedorDto]),
    __metadata("design:returntype", Promise)
], ProveedorController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('/delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProveedorController.prototype, "delete", null);
__decorate([
    (0, common_1.Get)(':id/medicamentos'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProveedorController.prototype, "findMedicamentos", null);
exports.ProveedorController = ProveedorController = __decorate([
    (0, common_1.Controller)('proveedores'),
    __metadata("design:paramtypes", [proveedor_service_1.ProveedorService])
], ProveedorController);
//# sourceMappingURL=proveedor.controller.js.map