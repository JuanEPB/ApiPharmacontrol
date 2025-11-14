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
exports.SuscripcionController = void 0;
const common_1 = require("@nestjs/common");
const suscripcion_service_1 = require("./suscripcion.service");
let SuscripcionController = class SuscripcionController {
    suscripcionService;
    constructor(suscripcionService) {
        this.suscripcionService = suscripcionService;
    }
    crearInicial(empresaId, plan = 'Básico') {
        return this.suscripcionService.crearSuscripcionInicial(empresaId, plan);
    }
    renovar(empresaId, dias) {
        return this.suscripcionService.renovarSuscripcion(empresaId, dias);
    }
    verificarVencidas() {
        return this.suscripcionService.verificarSuscripcionesVencidas();
    }
};
exports.SuscripcionController = SuscripcionController;
__decorate([
    (0, common_1.Post)('crear-inicial/:empresaId'),
    __param(0, (0, common_1.Param)('empresaId')),
    __param(1, (0, common_1.Body)('plan')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", void 0)
], SuscripcionController.prototype, "crearInicial", null);
__decorate([
    (0, common_1.Post)('renovar/:empresaId'),
    __param(0, (0, common_1.Param)('empresaId')),
    __param(1, (0, common_1.Body)('dias')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], SuscripcionController.prototype, "renovar", null);
__decorate([
    (0, common_1.Get)('verificar-vencidas'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SuscripcionController.prototype, "verificarVencidas", null);
exports.SuscripcionController = SuscripcionController = __decorate([
    (0, common_1.Controller)('suscripciones'),
    __metadata("design:paramtypes", [suscripcion_service_1.SuscripcionService])
], SuscripcionController);
//# sourceMappingURL=suscripcion.controller.js.map