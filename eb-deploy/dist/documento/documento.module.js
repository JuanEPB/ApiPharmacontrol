"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentoModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const documento_schema_1 = require("./schemas/documento.schema");
const documento_service_1 = require("./documento.service");
const documento_controller_1 = require("./documento.controller");
const historial_exportacion_module_1 = require("../historial_exportacion/historial_exportacion.module");
const users_module_1 = require("../users/users.module");
let DocumentoModule = class DocumentoModule {
};
exports.DocumentoModule = DocumentoModule;
exports.DocumentoModule = DocumentoModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: documento_schema_1.Documento.name, schema: documento_schema_1.DocumentoSchema }]),
            historial_exportacion_module_1.HistorialExportacionModule,
            users_module_1.UsersModule
        ],
        providers: [documento_service_1.DocumentoService],
        controllers: [documento_controller_1.DocumentoController],
        exports: [documento_service_1.DocumentoService],
    })
], DocumentoModule);
//# sourceMappingURL=documento.module.js.map