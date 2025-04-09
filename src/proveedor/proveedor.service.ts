import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Proveedor } from './entity/proveedor.entity';
import { Repository } from 'typeorm';
import { Medicamentos } from 'src/products/entity/products.entity';
import { CreateProveedorDto } from './dto/create-proveedor.dto';
import { UpdateProvedorDto } from './dto/update-proveedor.dto';

@Injectable()
export class ProveedorService {

    constructor(
        @InjectRepository(Proveedor)
        private proveedorRepository: Repository<Proveedor>,
        @InjectRepository(Medicamentos)
        private medicamentoRepository: Repository<Medicamentos>,
    ){}

    async getAll(){
        return this.proveedorRepository.find();
    }

    async getById(id: number){
        return this.proveedorRepository.findOne({where: {id}})
    }

    async create(CreateProveedorDto: CreateProveedorDto): Promise<Proveedor>{
        const proveedor = this.proveedorRepository.create({
            nombre: CreateProveedorDto.nombre,
            contacto: CreateProveedorDto.contacto,
            direccion: CreateProveedorDto.contacto,
        });

        return this.proveedorRepository.save(proveedor)

    }

    async update(id: number, UpdateProvedorDto: UpdateProvedorDto){

        const proveedor = await this.proveedorRepository.findOneBy({id})

        if (!proveedor){
            throw new Error('Proveedor no encontrado')
        }

        Object.assign(proveedor, UpdateProvedorDto);

        return this.proveedorRepository.save(proveedor);
    }

    async delete(id: number): Promise <Proveedor | null>{
        const proveedor = await this.proveedorRepository.findOneBy({id})

        if (!proveedor){
            throw new Error('Proveedor no encontrado');
        }

        return this.proveedorRepository.remove(proveedor);
    }
}
