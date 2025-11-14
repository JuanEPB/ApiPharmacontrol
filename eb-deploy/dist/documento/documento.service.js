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
exports.DocumentoService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const documento_schema_1 = require("./schemas/documento.schema");
let DocumentoService = class DocumentoService {
    documentoModel;
    constructor(documentoModel) {
        this.documentoModel = documentoModel;
    }
    async guardarDesdeBuffer(buffer, filename, mimetype, generadoPor, descripcion, tipoReporte) {
        const doc = new this.documentoModel({
            filename,
            mimetype,
            data: buffer,
            generadoPor: generadoPor || 'IA',
            descripcion,
            tipoReporte,
        });
        return doc.save();
    }
    async obtenerDocumentoPorId(id) {
        return this.documentoModel.findById(id).exec();
    }
    async listarDocumentos() {
        return this.documentoModel
            .find()
            .select('-data')
            .sort({ createdAt: -1 })
            .limit(100)
            .exec();
    }
    async obtenerPorTipoReporte(tipo) {
        return this.documentoModel.find({ tipoReporte: tipo }).select('-data').exec();
    }
};
exports.DocumentoService = DocumentoService;
exports.DocumentoService = DocumentoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(documento_schema_1.Documento.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], DocumentoService);
//# sourceMappingURL=documento.service.js.map