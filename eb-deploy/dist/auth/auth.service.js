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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../users/users.service");
const bcrypt = require("bcrypt");
const ACCESS_EXPIRES_IN = '15m';
const REFRESH_EXPIRES_IN = '7d';
let AuthService = class AuthService {
    usersService;
    jwtService;
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    refreshStore = new Map();
    async validateUser(email, contraseña) {
        const user = await this.usersService.findByEmail(email);
        if (!user)
            return null;
        const ok = await bcrypt.compare(contraseña, user.contraseña);
        if (!ok)
            return null;
        return { id: user.id, email: user.email, rol: user.rol };
    }
    signAccess(payload) {
        return this.jwtService.sign(payload, {
            secret: process.env.JWT_ACCESS_SECRET,
            expiresIn: ACCESS_EXPIRES_IN,
        });
    }
    signRefresh(payload) {
        return this.jwtService.sign(payload, {
            secret: process.env.JWT_REFRESH_SECRET,
            expiresIn: REFRESH_EXPIRES_IN,
        });
    }
    async issueTokens(user) {
        if (!user)
            throw new common_1.UnauthorizedException('Credenciales inválidas');
        const payload = { sub: user.id, email: user.email, rol: user.rol };
        const accessToken = this.signAccess(payload);
        const refreshToken = this.signRefresh({ sub: user.id });
        this.refreshStore.set(user.id, refreshToken);
        return { accessToken, refreshToken };
    }
    async refreshWithToken(refreshToken) {
        let decoded;
        try {
            decoded = this.jwtService.verify(refreshToken, { secret: process.env.JWT_REFRESH_SECRET });
        }
        catch {
            throw new common_1.UnauthorizedException('Refresh inválido o expirado');
        }
        const last = this.refreshStore.get(decoded.sub);
        if (!last || last !== refreshToken) {
            throw new common_1.UnauthorizedException('Refresh no reconocido');
        }
        const user = await this.usersService.findById(decoded.sub);
        if (!user)
            throw new common_1.UnauthorizedException('Usuario no encontrado');
        const payload = { sub: user.id, email: user.email, rol: user.rol };
        const accessToken = this.signAccess(payload);
        const newRT = this.signRefresh({ sub: user.id });
        this.refreshStore.set(user.id, newRT);
        return { accessToken, refreshToken: newRT };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map