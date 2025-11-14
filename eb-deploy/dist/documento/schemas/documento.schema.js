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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentoSchema = exports.Documento = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let Documento = class Documento {
    filename;
    mimetype;
    data;
    descripcion;
    generadoPor;
    tipoReporte;
};
exports.Documento = Documento;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Documento.prototype, "filename", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Documento.prototype, "mimetype", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: Buffer }),
    __metadata("design:type", Buffer)
], Documento.prototype, "data", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Documento.prototype, "descripcion", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Documento.prototype, "generadoPor", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Documento.prototype, "tipoReporte", void 0);
exports.Documento = Documento = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Documento);
exports.DocumentoSchema = mongoose_1.SchemaFactory.createForClass(Documento);
//# sourceMappingURL=documento.schema.js.map