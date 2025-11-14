import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { AuthUser } from './auth.types';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    private refreshStore;
    validateUser(email: string, contraseña: string): Promise<AuthUser | null>;
    private signAccess;
    private signRefresh;
    issueTokens(user: AuthUser): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    refreshWithToken(refreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
}
