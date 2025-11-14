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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentoController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const documento_service_1 = require("./documento.service");
const historial_exportacion_service_1 = require("../historial_exportacion/historial_exportacion.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const user_decorator_1 = require("../auth/user.decorator");
const users_service_1 = require("../users/users.service");
const multer_1 = require("multer");
const mongoose_1 = require("mongoose");
let DocumentoController = class DocumentoController {
    documentoService;
    historialExportacionService;
    usersService;
    constructor(documentoService, historialExportacionService, usersService) {
        this.documentoService = documentoService;
        this.historialExportacionService = historialExportacionService;
        this.usersService = usersService;
    }
    async subirDocumento(file, usuarioPayload, body, res) {
        if (!file) {
            return res.status(400).json({ mensaje: 'Archivo no enviado' });
        }
        const usuario = await this.usersService.findByEmail(usuarioPayload.userId);
        if (!usuario) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado en MySQL' });
        }
        const buffer = Buffer.isBuffer(file.buffer)
            ? file.buffer
            : Buffer.from(file.buffer);
        const documento = await this.documentoService.guardarDesdeBuffer(buffer, file.originalname, file.mimetype, usuario.nombre || 'Usuario', body.descripcion || '', body.tipoReporte || '');
        await this.historialExportacionService.registrar(usuario, documento._id.toString());
        return res.status(201).json({
            mensaje: 'Documento guardado y historial registrado',
            idDocumento: documento._id,
        });
    }
    async listarDocumentos() {
        const documentos = await this.documentoService.listarDocumentos();
        return documentos.map((doc) => ({
            _id: doc._id,
            filename: doc.filename,
            mimetype: doc.mimetype,
            descripcion: doc.descripcion,
            tipoReporte: doc.tipoReporte,
            generadoPor: doc.generadoPor,
            createdAt: doc.createdAt,
            updatedAt: doc.updatedAt,
        }));
    }
    async obtenerPorTipoReporte(tipo) {
        const documentos = await this.documentoService.obtenerPorTipoReporte(tipo);
        if (!documentos || documentos.length === 0) {
            return {
                mensaje: 'No se encontraron documentos para este tipo de reporte',
                statusCode: 404,
            };
        }
        return documentos;
    }
    async obtenerDocumentoPorId(id, res) {
        const documento = await this.documentoService.obtenerDocumentoPorId(id);
        if (!documento) {
            throw new common_1.NotFoundException('Documento no encontrado');
        }
        if (documento.mimetype === 'application/json') {
            try {
                let jsonString;
                const data = documento.data;
                if (Buffer.isBuffer(data)) {
                    jsonString = data.toString('utf8');
                }
                else if (data?.type === 'Buffer' && Array.isArray(data?.data)) {
                    jsonString = Buffer.from(data.data).toString('utf8');
                }
                else if (data?.buffer) {
                    jsonString = Buffer.from(data.buffer).toString('utf8');
                }
                else {
                    throw new Error('Formato de documento no reconocido');
                }
                const cleanString = jsonString.trim().replace(/\0/g, '');
                const lastBrace = Math.max(cleanString.lastIndexOf('}'), cleanString.lastIndexOf(']'));
                const safeJSON = cleanString.slice(0, lastBrace + 1);
                const parsed = JSON.parse(safeJSON);
                res.json(parsed);
                return;
            }
            catch (error) {
                console.error('❌ Error parseando JSON del documento:', error);
                res.status(500).json({ mensaje: 'Error procesando documento JSON' });
                return;
            }
        }
        res.set({
            'Content-Type': documento.mimetype,
            'Content-Disposition': `inline; filename="${documento.filename}"`,
        });
        res.send(documento.data);
    }
    async descargarDocumentoPorId(id, res) {
        if (!mongoose_1.default.isValidObjectId(id)) {
            throw new common_1.NotFoundException('ID ${id} de documento no válido');
        }
        const documento = await this.documentoService.obtenerDocumentoPorId(id);
        if (!documento) {
            throw new common_1.NotFoundException('Documento no encontrado');
        }
        const data = documento.data;
        const buffer = Buffer.isBuffer(data)
            ? data
            : Buffer.from(data.buffer || data.data);
        res.set({
            'Content-Type': documento.mimetype,
            'Content-Disposition': `attachment; filename="${documento.filename}"`,
        });
        res.send(buffer);
    }
};
exports.DocumentoController = DocumentoController;
__decorate([
    (0, common_1.Post)('subir'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, user_decorator_1.User)()),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof multer_1.File !== "undefined" && multer_1.File) === "function" ? _a : Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], DocumentoController.prototype, "subirDocumento", null);
__decorate([
    (0, common_1.Get)('listar'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DocumentoController.prototype, "listarDocumentos", null);
__decorate([
    (0, common_1.Get)('tipo/:tipo'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('tipo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DocumentoController.prototype, "obtenerPorTipoReporte", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], DocumentoController.prototype, "obtenerDocumentoPorId", null);
__decorate([
    (0, common_1.Get)('descargar/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], DocumentoController.prototype, "descargarDocumentoPorId", null);
exports.DocumentoController = DocumentoController = __decorate([
    (0, common_1.Controller)('documentos'),
    __metadata("design:paramtypes", [documento_service_1.DocumentoService,
        historial_exportacion_service_1.HistorialExportacionService,
        users_service_1.UsersService])
], DocumentoController);
//# sourceMappingURL=documento.controller.js.map