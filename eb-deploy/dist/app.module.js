"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const products_module_1 = require("./products/products.module");
const proveedor_module_1 = require("./proveedor/proveedor.module");
const users_module_1 = require("./users/users.module");
const typeorm_1 = require("@nestjs/typeorm");
const categorias_module_1 = require("./categorias/categorias.module");
const historial_importacion_controller_1 = require("./historial_importacion/historial_importacion.controller");
const historial_importacion_service_1 = require("./historial_importacion/historial_importacion.service");
const historial_importacion_module_1 = require("./historial_importacion/historial_importacion.module");
const historial_exportacion_module_1 = require("./historial_exportacion/historial_exportacion.module");
const products_entity_1 = require("./products/entity/products.entity");
const proveedor_entity_1 = require("./proveedor/entity/proveedor.entity");
const categorias_entity_1 = require("./categorias/entity/categorias.entity");
const users_entity_1 = require("./users/entity/users.entity");
const auth_module_1 = require("./auth/auth.module");
const config_1 = require("@nestjs/config");
const documento_module_1 = require("./documento/documento.module");
const mongoose_1 = require("@nestjs/mongoose");
const historial_exportacion_entity_1 = require("./historial_exportacion/entity/historial_exportacion.entity");
const venta_module_1 = require("./venta/venta.module");
const venta_entity_1 = require("./venta/entities/venta.entity");
const venta_detalle_entity_1 = require("./venta/entities/venta_detalle.entity");
const empresa_module_1 = require("./empresa/empresa.module");
const plan_module_1 = require("./plan/plan.module");
const suscripcion_module_1 = require("./suscripcion/suscripcion.module");
const configuracion_module_1 = require("./configuracion/configuracion.module");
const farmacia_module_1 = require("./farmacia/farmacia.module");
const plan_entity_1 = require("./plan/entities/plan.entity");
const suscripcion_entity_1 = require("./suscripcion/entities/suscripcion.entity");
const farmacia_entity_1 = require("./farmacia/entities/farmacia.entity");
const empresa_entity_1 = require("./empresa/entities/empresa.entity");
const pedidos_module_1 = require("./pedidos/pedidos.module");
const pedido_entity_1 = require("./pedidos/entities/pedido.entity");
const pedido_item_entity_1 = require("./pedidos/entities/pedido-item.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forRoot('mongodb+srv://larts:yj7yZjRZIBMr3TJa@pharmacontrol.1aqn71v.mongodb.net/'),
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: process.env.DB_HOST,
                port: 3306,
                username: process.env.DB_USER,
                password: process.env.DB_PASS,
                database: process.env.DB_NAME,
                entities: [products_entity_1.Medicamentos, proveedor_entity_1.Proveedor, categorias_entity_1.Categoria, users_entity_1.Usuario, historial_exportacion_entity_1.HistorialExportacion, venta_entity_1.Venta, venta_detalle_entity_1.VentaDetalle, plan_entity_1.Plan, suscripcion_entity_1.Suscripcion, farmacia_entity_1.Farmacia, empresa_entity_1.Empresa, pedido_entity_1.Pedido, pedido_item_entity_1.PedidoItem],
                synchronize: true,
            }),
            products_module_1.ProductsModule, proveedor_module_1.ProveedorModule, users_module_1.UsersModule, categorias_module_1.CategoriasModule, historial_importacion_module_1.HistorialImportacionModule, historial_exportacion_module_1.HistorialExportacionModule, auth_module_1.AuthModule, documento_module_1.DocumentoModule, venta_module_1.VentaModule, empresa_module_1.EmpresaModule, plan_module_1.PlanModule, suscripcion_module_1.SuscripcionModule, configuracion_module_1.ConfiguracionModule, farmacia_module_1.FarmaciaModule, pedidos_module_1.PedidosModule
        ],
        controllers: [app_controller_1.AppController, historial_importacion_controller_1.HistorialImportacionController],
        providers: [app_service_1.AppService, historial_importacion_service_1.HistorialImportacionService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map