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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const users_entity_1 = require("./entity/users.entity");
const bcrypt = require("bcryptjs");
let UsersService = class UsersService {
    usersRepository;
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async findAll() {
        return this.usersRepository.find();
    }
    async findOne(id) {
        return this.usersRepository.findOne({ where: { id } });
    }
    async findByEmail(email) {
        return this.usersRepository.findOne({ where: { email } });
    }
    async findById(id) {
        return this.usersRepository.findOne({ where: { id } });
    }
    async create(createUsuarioDto) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(createUsuarioDto.contraseña, salt);
        const user = this.usersRepository.create({
            ...createUsuarioDto,
            contraseña: hashedPassword,
        });
        return this.usersRepository.save(user);
    }
    async update(id, updateUsuarioDto) {
        if (Object.keys(updateUsuarioDto).length === 0) {
            throw new common_1.BadRequestException('No se proporcionaron datos para actualizar');
        }
        const user = await this.usersRepository.findOne({ where: { id } });
        if (!user) {
            throw new common_1.NotFoundException(`Usuario con ID ${id} no encontrado`);
        }
        const updatedUser = Object.assign(user, updateUsuarioDto);
        return this.usersRepository.save(updatedUser);
    }
    async findAndDelete(id) {
        const usuario = await this.usersRepository.findOneBy({ id });
        if (!usuario) {
            throw new Error('Usuario no encontrado');
        }
        return this.usersRepository.remove(usuario);
    }
    async findByRole(role) {
        return this.usersRepository.find({ where: { rol: role } });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(users_entity_1.Usuario)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map