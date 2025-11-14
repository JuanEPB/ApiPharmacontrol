import { AuthService } from './auth.service';
import { Response, Request } from 'express';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(body: {
        email: string;
        contraseña: string;
    }, res: Response): Promise<{
        user: import("./auth.types").AuthUser;
        accessToken: string;
    }>;
    refresh(req: Request, res: Response): Promise<{
        accessToken: string;
    }>;
    logout(res: Response): Promise<{
        ok: boolean;
    }>;
}
