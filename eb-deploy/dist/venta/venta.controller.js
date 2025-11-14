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
exports.VentaController = void 0;
const common_1 = require("@nestjs/common");
const venta_service_1 = require("./venta.service");
const create_venta_dto_1 = require("./dto/create-venta.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const user_decorator_1 = require("../auth/user.decorator");
let VentaController = class VentaController {
    ventaService;
    constructor(ventaService) {
        this.ventaService = ventaService;
    }
    async crearVenta(dto, userId) {
        return this.ventaService.crearVenta(dto, userId);
    }
};
exports.VentaController = VentaController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.UserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_venta_dto_1.CreateVentaDto, Number]),
    __metadata("design:returntype", Promise)
], VentaController.prototype, "crearVenta", null);
exports.VentaController = VentaController = __decorate([
    (0, common_1.Controller)('venta'),
    __metadata("design:paramtypes", [venta_service_1.VentaService])
], VentaController);
//# sourceMappingURL=venta.controller.js.map