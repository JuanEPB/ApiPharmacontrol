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
exports.PedidosService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const pedido_entity_1 = require("./entities/pedido.entity");
const pedido_item_entity_1 = require("./entities/pedido-item.entity");
const pedido_status_enum_1 = require("./dto/pedido-status.enum");
const proveedor_entity_1 = require("../proveedor/entity/proveedor.entity");
const farmacia_entity_1 = require("../farmacia/entities/farmacia.entity");
const products_entity_1 = require("../products/entity/products.entity");
let PedidosService = class PedidosService {
    pedidoRepo;
    itemRepo;
    proveedorRepo;
    farmaciaRepo;
    medRepo;
    dataSource;
    constructor(pedidoRepo, itemRepo, proveedorRepo, farmaciaRepo, medRepo, dataSource) {
        this.pedidoRepo = pedidoRepo;
        this.itemRepo = itemRepo;
        this.proveedorRepo = proveedorRepo;
        this.farmaciaRepo = farmaciaRepo;
        this.medRepo = medRepo;
        this.dataSource = dataSource;
    }
    async create(dto) {
        if (!dto || !Array.isArray(dto.items) || dto.items.length === 0) {
            throw new common_1.BadRequestException('El pedido requiere al menos 1 item');
        }
        const proveedor = await this.proveedorRepo.findOne({ where: { id: dto.proveedorId } });
        const farmacia = await this.farmaciaRepo.findOne({ where: { id: dto.farmaciaId } });
        if (!proveedor || !farmacia)
            throw new common_1.NotFoundException('Proveedor o Farmacia no válidos');
        let total = 0;
        const items = [];
        for (const i of dto.items) {
            const med = await this.medRepo.findOne({ where: { id: i.medicamentoId } });
            if (!med)
                throw new common_1.NotFoundException(`Medicamento ${i.medicamentoId} no existe`);
            const precio = i.precioUnitario ?? Number(med.precio ?? 0);
            const subtotal = +(precio * i.cantidad).toFixed(2);
            total += subtotal;
            items.push(this.itemRepo.create({
                medicamento: med,
                cantidad: i.cantidad,
                precioUnitario: precio.toFixed(2),
                subtotal: subtotal.toFixed(2),
                lote: i.lote,
                fechaCaducidad: i.fechaCaducidad,
            }));
        }
        const pedido = this.pedidoRepo.create({
            proveedor,
            farmacia,
            estatus: pedido_status_enum_1.PedidoStatus.ENVIADO,
            total: total.toFixed(2),
            items,
        });
        return this.pedidoRepo.save(pedido);
    }
    async findAll() {
        return this.pedidoRepo.find({ order: { id: 'DESC' } });
    }
    async findOne(id) {
        const pedido = await this.pedidoRepo.findOne({
            where: { id },
            relations: { proveedor: true, farmacia: true, items: { medicamento: true } },
        });
        if (!pedido)
            throw new common_1.NotFoundException('Pedido no encontrado');
        return pedido;
    }
    async updateStatus(id, dto) {
        const pedido = await this.findOne(id);
        if (pedido.estatus === pedido_status_enum_1.PedidoStatus.RECIBIDO && dto.estatus === pedido_status_enum_1.PedidoStatus.RECIBIDO) {
            throw new common_1.BadRequestException('El pedido ya fue recibido');
        }
        if (dto.estatus !== pedido_status_enum_1.PedidoStatus.RECIBIDO) {
            pedido.estatus = dto.estatus;
            return this.pedidoRepo.save(pedido);
        }
        await this.dataSource.transaction(async (manager) => {
            for (const it of pedido.items) {
                await manager
                    .getRepository(products_entity_1.Medicamentos)
                    .createQueryBuilder()
                    .update()
                    .set({ stock: () => `stock + ${it.cantidad}` })
                    .where({ id: it.medicamento.id })
                    .execute();
            }
            pedido.estatus = pedido_status_enum_1.PedidoStatus.RECIBIDO;
            pedido.fechaRecibido = new Date();
            await manager.getRepository(pedido_entity_1.Pedido).save(pedido);
        });
        return this.findOne(id);
    }
};
exports.PedidosService = PedidosService;
exports.PedidosService = PedidosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(pedido_entity_1.Pedido)),
    __param(1, (0, typeorm_1.InjectRepository)(pedido_item_entity_1.PedidoItem)),
    __param(2, (0, typeorm_1.InjectRepository)(proveedor_entity_1.Proveedor)),
    __param(3, (0, typeorm_1.InjectRepository)(farmacia_entity_1.Farmacia)),
    __param(4, (0, typeorm_1.InjectRepository)(products_entity_1.Medicamentos)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource])
], PedidosService);
//# sourceMappingURL=pedidos.service.js.map