import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entity/users.entity';
import { CreateUsuarioDto } from './dto/create_users.dto';
import { UpdateUsuarioDto } from './dto/update_users.dto';
import * as bcrypt from 'bcryptjs';

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
}
