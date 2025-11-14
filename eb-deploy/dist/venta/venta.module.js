"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VentaModule = void 0;
const common_1 = require("@nestjs/common");
const venta_service_1 = require("./venta.service");
const venta_controller_1 = require("./venta.controller");
const typeorm_1 = require("@nestjs/typeorm");
const venta_entity_1 = require("./entities/venta.entity");
const venta_detalle_entity_1 = require("./entities/venta_detalle.entity");
const products_entity_1 = require("../products/entity/products.entity");
const documento_module_1 = require("../documento/documento.module");
const historial_exportacion_module_1 = require("../historial_exportacion/historial_exportacion.module");
const users_entity_1 = require("../users/entity/users.entity");
let VentaModule = class VentaModule {
};
exports.VentaModule = VentaModule;
exports.VentaModule = VentaModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([venta_entity_1.Venta, venta_detalle_entity_1.VentaDetalle, products_entity_1.Medicamentos, users_entity_1.Usuario]),
            documento_module_1.DocumentoModule,
            historial_exportacion_module_1.HistorialExportacionModule,
        ],
        controllers: [venta_controller_1.VentaController],
        providers: [venta_service_1.VentaService],
        exports: [venta_service_1.VentaService],
    })
], VentaModule);
//# sourceMappingURL=venta.module.js.map