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
exports.ConfiguracionController = void 0;
const common_1 = require("@nestjs/common");
const configuracion_service_1 = require("./configuracion.service");
const create_configuracion_dto_1 = require("./dto/create-configuracion.dto");
const update_configuracion_dto_1 = require("./dto/update-configuracion.dto");
let ConfiguracionController = class ConfiguracionController {
    configuracionService;
    constructor(configuracionService) {
        this.configuracionService = configuracionService;
    }
    crear(dto) {
        return this.configuracionService.crear(dto);
    }
    obtenerPorEmpresa(empresaId) {
        return this.configuracionService.obtenerPorEmpresa(empresaId);
    }
    actualizar(id, dto) {
        return this.configuracionService.actualizar(id, dto);
    }
};
exports.ConfiguracionController = ConfiguracionController;
__decorate([
    (0, common_1.Post)('crear'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_configuracion_dto_1.CreateConfiguracionDto]),
    __metadata("design:returntype", void 0)
], ConfiguracionController.prototype, "crear", null);
__decorate([
    (0, common_1.Get)('empresa/:empresaId'),
    __param(0, (0, common_1.Param)('empresaId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ConfiguracionController.prototype, "obtenerPorEmpresa", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_configuracion_dto_1.UpdateConfiguracionDto]),
    __metadata("design:returntype", void 0)
], ConfiguracionController.prototype, "actualizar", null);
exports.ConfiguracionController = ConfiguracionController = __decorate([
    (0, common_1.Controller)('configuracion'),
    __metadata("design:paramtypes", [configuracion_service_1.ConfiguracionService])
], ConfiguracionController);
//# sourceMappingURL=configuracion.controller.js.map