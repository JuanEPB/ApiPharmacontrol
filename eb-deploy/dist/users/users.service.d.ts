import { Repository } from 'typeorm';
import { Usuario } from './entity/users.entity';
import { CreateUsuarioDto } from './dto/create_users.dto';
import { UpdateUsuarioDto } from './dto/update_users.dto';
import { Rol } from './dto/roles.enum';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<Usuario>);
    findAll(): Promise<Usuario[]>;
    findOne(id: number): Promise<Usuario | null>;
    findByEmail(email: string): Promise<Usuario | null>;
    findById(id: number): Promise<Usuario | null>;
    create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario>;
    update(id: number, updateUsuarioDto: UpdateUsuarioDto): Promise<Usuario>;
    findAndDelete(id: number): Promise<Usuario | null>;
    findByRole(role: Rol): Promise<Usuario[]>;
}
