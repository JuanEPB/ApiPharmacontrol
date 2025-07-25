import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin, Repository } from 'typeorm';
import { Usuario } from './entity/users.entity';
import { CreateUsuarioDto } from './dto/create_users.dto';
import { UpdateUsuarioDto } from './dto/update_users.dto';
import * as bcrypt from 'bcryptjs';
import { Rol } from './dto/roles.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Usuario)
    private usersRepository: Repository<Usuario>,
  ) {}

  async findAll(): Promise<Usuario[]> {
    return this.usersRepository.find();
  }

  async findOne(id: number): Promise<Usuario | null> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async findByEmail(email: string){
    return this.usersRepository.findOne({where: {email }});

  }

  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    const salt = await bcrypt.genSalt(10);  
    const hashedPassword = await bcrypt.hash(createUsuarioDto.contraseña, salt);  

    const user = this.usersRepository.create({
      ...createUsuarioDto,
      contraseña: hashedPassword,  
    });

    return this.usersRepository.save(user);  
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto): Promise<Usuario> {
  if (Object.keys(updateUsuarioDto).length === 0) {
    throw new BadRequestException('No se proporcionaron datos para actualizar');
  }

  const user = await this.usersRepository.findOne({ where: { id } });
  if (!user) {
    throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
  }

  const updatedUser = Object.assign(user, updateUsuarioDto);
  return this.usersRepository.save(updatedUser);
}

  async findAndDelete(id: number): Promise<Usuario | null>{
    const usuario = await this.usersRepository.findOneBy({id})

    if(!usuario){
        throw new Error('Usuario no encontrado');
    }
    
    return this.usersRepository.remove(usuario);    
  }

  async findByRole(role: Rol): Promise<Usuario[]> {
    return this.usersRepository.find({ where: { rol: role } });
  }
}
