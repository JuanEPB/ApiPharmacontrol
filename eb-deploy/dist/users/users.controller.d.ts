import { UsersService } from './users.service';
import { CreateUsuarioDto } from './dto/create_users.dto';
import { UpdateUsuarioDto } from './dto/update_users.dto';
import { Usuario } from './entity/users.entity';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(): Promise<Usuario[]>;
    findOne(id: number): Promise<Usuario>;
    findByEmail(email: string): Promise<Usuario>;
    findByRol(rol: string): Promise<Usuario[]>;
    create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario>;
    update(id: number, updateUsuarioDto: UpdateUsuarioDto): Promise<Usuario>;
    delete(id: number): Promise<Usuario | null>;
    getPerfil(req: any): any;
}
