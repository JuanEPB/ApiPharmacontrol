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
exports.ProveedorService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const proveedor_entity_1 = require("./entity/proveedor.entity");
const typeorm_2 = require("typeorm");
const products_entity_1 = require("../products/entity/products.entity");
let ProveedorService = class ProveedorService {
    proveedorRepository;
    medicamentoRepository;
    constructor(proveedorRepository, medicamentoRepository) {
        this.proveedorRepository = proveedorRepository;
        this.medicamentoRepository = medicamentoRepository;
    }
    async getAll() {
        return this.proveedorRepository.find();
    }
    async getById(id) {
        return this.proveedorRepository.findOne({ where: { id } });
    }
    async create(CreateProveedorDto) {
        const proveedor = this.proveedorRepository.create({
            nombre: CreateProveedorDto.nombre,
            contacto: CreateProveedorDto.contacto,
            direccion: CreateProveedorDto.contacto,
        });
        return this.proveedorRepository.save(proveedor);
    }
    async update(id, UpdateProvedorDto) {
        const proveedor = await this.proveedorRepository.findOneBy({ id });
        if (!proveedor) {
            throw new Error('Proveedor no encontrado');
        }
        Object.assign(proveedor, UpdateProvedorDto);
        return this.proveedorRepository.save(proveedor);
    }
    async delete(id) {
        const proveedor = await this.proveedorRepository.findOneBy({ id });
        if (!proveedor) {
            throw new Error('Proveedor no encontrado');
        }
        return this.proveedorRepository.remove(proveedor);
    }
    async findMedicamentos(proveedorId) {
        const prov = await this.proveedorRepository.findOne({ where: { id: proveedorId } });
        if (!prov)
            throw new common_1.NotFoundException('Proveedor no encontrado');
        return this.medicamentoRepository.find({
            where: { proveedor: { id: proveedorId } },
            select: { id: true, nombre: true, precio: true, stock: true },
            order: { nombre: 'ASC' },
        });
    }
};
exports.ProveedorService = ProveedorService;
exports.ProveedorService = ProveedorService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(proveedor_entity_1.Proveedor)),
    __param(1, (0, typeorm_1.InjectRepository)(products_entity_1.Medicamentos)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ProveedorService);
//# sourceMappingURL=proveedor.service.js.map