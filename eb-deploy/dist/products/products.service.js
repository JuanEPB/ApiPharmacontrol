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
exports.MedicamentosService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const products_entity_1 = require("./entity/products.entity");
const typeorm_2 = require("typeorm");
const proveedor_entity_1 = require("../proveedor/entity/proveedor.entity");
const categorias_entity_1 = require("../categorias/entity/categorias.entity");
const typeorm_3 = require("typeorm");
const dayjs = require("dayjs");
let MedicamentosService = class MedicamentosService {
    medicamentoRepository;
    proveedorRepository;
    categoriaRepository;
    constructor(medicamentoRepository, proveedorRepository, categoriaRepository) {
        this.medicamentoRepository = medicamentoRepository;
        this.proveedorRepository = proveedorRepository;
        this.categoriaRepository = categoriaRepository;
    }
    findAll() {
        return this.medicamentoRepository.find({
            relations: ['proveedor', 'categoria'],
        });
    }
    findOne(id) {
        return this.medicamentoRepository.findOne({
            where: { id },
            relations: ['proveedor', 'categoria'],
        });
    }
    async create(createMedicamentoDto) {
        const proveedor = await this.proveedorRepository.findOneBy({ id: createMedicamentoDto.proveedorId });
        const categoria = await this.categoriaRepository.findOneBy({ id: createMedicamentoDto.categoriaId });
        if (!proveedor || !categoria) {
            throw new Error('Proveedor o categoría no encontrados');
        }
        const medicamento = this.medicamentoRepository.create({
            nombre: createMedicamentoDto.nombre,
            lote: createMedicamentoDto.lote,
            caducidad: createMedicamentoDto.caducidad,
            stock: createMedicamentoDto.stock,
            precio: createMedicamentoDto.precio,
            proveedor,
            categoria,
        });
        return this.medicamentoRepository.save(medicamento);
    }
    async update(id, updateMedicamentoDto) {
        const medicamento = await this.medicamentoRepository.findOneBy({ id });
        if (!medicamento) {
            throw new Error('Medicamento no encontrado');
        }
        if (updateMedicamentoDto.proveedorId) {
            const proveedor = await this.proveedorRepository.findOneBy({ id: updateMedicamentoDto.proveedorId });
            if (proveedor) {
                medicamento.proveedor = proveedor;
            }
        }
        if (updateMedicamentoDto.categoriaId) {
            const categoria = await this.categoriaRepository.findOneBy({ id: updateMedicamentoDto.categoriaId });
            if (categoria) {
                medicamento.categoria = categoria;
            }
        }
        if (medicamento.lote) {
        }
        Object.assign(medicamento, updateMedicamentoDto);
        return this.medicamentoRepository.save(medicamento);
    }
    async delete(id) {
        const medicamento = await this.medicamentoRepository.findOneBy({ id });
        if (!medicamento) {
            throw new Error('Medicamento no encontrado');
        }
        return this.medicamentoRepository.remove(medicamento);
    }
    async contarMedicamentos() {
        return await this.medicamentoRepository.count();
    }
    async countByName(name) {
        const count = await this.medicamentoRepository.count({
            where: { nombre: name },
        });
        return { total: count };
    }
    async dataCaducidadMedicamentos() {
        const today = new Date();
        const monthsLater = new Date();
        monthsLater.setMonth(today.getMonth() + 18);
        const medicamentos = await this.medicamentoRepository.find({
            where: {
                caducidad: (0, typeorm_2.Between)(today, monthsLater),
            },
            relations: ['proveedor', 'categoria'],
        });
        const total = medicamentos.length;
        return { total, medicamentos };
    }
    async caducidadMedicamentos() {
        const today = new Date();
        const monthsLater = new Date();
        monthsLater.setMonth(today.getMonth() + 18);
        return this.medicamentoRepository.find({
            where: {
                caducidad: (0, typeorm_2.Between)(today, monthsLater),
            },
            relations: ['proveedor', 'categoria'],
        });
    }
    async lowStockMedicamentos() {
        return this.medicamentoRepository.find({
            where: {
                stock: (0, typeorm_3.LessThan)(10),
            },
            relations: ['proveedor', 'categoria'],
        });
    }
    async findByName(name) {
        return this.medicamentoRepository.find({
            where: {
                nombre: name,
            },
            relations: ['proveedor', 'categoria'],
        });
    }
    async findByLote(lote) {
        return this.medicamentoRepository.find({
            where: {
                lote: lote,
            },
            relations: ['proveedor', 'categoria'],
        });
    }
    async findByCaducidad(caducidad) {
        return this.medicamentoRepository.find({
            where: {
                caducidad: caducidad,
            },
            relations: ['proveedor', 'categoria'],
        });
    }
    async findByStock(stock) {
        return this.medicamentoRepository.find({
            where: {
                stock: stock,
            },
            relations: ['proveedor', 'categoria'],
        });
    }
    async findByPrecio(precio) {
        return this.medicamentoRepository.find({
            where: {
                precio: precio,
            },
            relations: ['proveedor', 'categoria'],
        });
    }
    async findByProveedor(proveedorId) {
        return this.medicamentoRepository.find({
            where: {
                proveedor: { id: proveedorId },
            },
            relations: ['proveedor', 'categoria'],
        });
    }
    async findByCategoria(categoriaId) {
        return this.medicamentoRepository.find({
            where: {
                categoria: { id: categoriaId },
            },
            relations: ['proveedor', 'categoria'],
        });
    }
    async getStats() {
        const hoy = dayjs();
        const limite = hoy.add(30, 'day').toDate();
        const total = await this.medicamentoRepository.count();
        const porCaducar = await this.medicamentoRepository.count({
            where: { caducidad: (0, typeorm_2.Between)(hoy.toDate(), limite) },
        });
        const caducados = await this.medicamentoRepository.count({
            where: { caducidad: (0, typeorm_3.LessThan)(hoy.toDate()) },
        });
        const porCategoriaQuery = await this.medicamentoRepository
            .createQueryBuilder('medicamento')
            .select('categoria.nombre', 'categoria')
            .addSelect('COUNT(medicamento.id)', 'total')
            .leftJoin('medicamento.categoria', 'categoria')
            .groupBy('categoria.nombre')
            .getRawMany();
        const porCategoria = porCategoriaQuery.reduce((acc, cur) => ({ ...acc, [cur.categoria || 'Sin categoría']: Number(cur.total) }), {});
        return { total, porCaducar, caducados, porCategoria };
    }
};
exports.MedicamentosService = MedicamentosService;
exports.MedicamentosService = MedicamentosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(products_entity_1.Medicamentos)),
    __param(1, (0, typeorm_1.InjectRepository)(proveedor_entity_1.Proveedor)),
    __param(2, (0, typeorm_1.InjectRepository)(categorias_entity_1.Categoria)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], MedicamentosService);
//# sourceMappingURL=products.service.js.map