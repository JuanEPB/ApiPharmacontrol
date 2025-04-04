import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Medicamentos } from './entity/products.entity';
import { Repository } from 'typeorm';
import { Proveedor } from 'src/proveedor/entity/proveedor.entity';
import { Categoria } from 'src/categorias/entity/categorias.entity';
import { CreateMedicamentoDto } from './dto/create_product.dto';
import { UpdateMedicamentoDto } from './dto/update_medicamento.dto';

@Injectable()
export class MedicamentosService {

    constructor(
        @InjectRepository(Medicamentos)
        private medicamentoRepository: Repository<Medicamentos>,
        @InjectRepository(Proveedor)
        private proveedorRepository: Repository<Proveedor>, // Repositorio del proveedor
        @InjectRepository(Categoria)
        private categoriaRepository: Repository<Categoria>, // Repositorio de la categoría
      ) {}

  // Obtener todos los medicamentos con relaciones
  findAll(): Promise<Medicamentos[]> {
    return this.medicamentoRepository.find({
      relations: ['proveedor', 'categoria'],
    });
  }

  // Obtener un medicamento por su ID
  findOne(id: number): Promise<Medicamentos | null> {
    return this.medicamentoRepository.findOne({
      where: { id },
      relations: ['proveedor', 'categoria'],
    });
  }


  // Crear un nuevo medicamento
  async create(createMedicamentoDto: CreateMedicamentoDto): Promise<Medicamentos> {
    // Buscamos el proveedor y la categoria usando los IDs proporcionados
    const proveedor = await this.proveedorRepository.findOneBy({ id: createMedicamentoDto.proveedorId });
    const categoria = await this.categoriaRepository.findOneBy({ id: createMedicamentoDto.categoriaId });

    if (!proveedor || !categoria) {
      throw new Error('Proveedor o categoría no encontrados');
    }

    // Creamos un nuevo objeto Medicamentos
    const medicamento = this.medicamentoRepository.create({
      nombre: createMedicamentoDto.nombre,
      lote: createMedicamentoDto.lote,
      caducidad: createMedicamentoDto.caducidad,
      stock: createMedicamentoDto.stock,
      precio: createMedicamentoDto.precio,
      proveedor,  // Asignamos la relación con proveedor
      categoria,  // Asignamos la relación con categoria
    });

    // Guardamos el medicamento en la base de datos
    return this.medicamentoRepository.save(medicamento);
  }

  // Actualizar un medicamento existente
  async update(id: number, updateMedicamentoDto: UpdateMedicamentoDto): Promise<Medicamentos | null> {
    // Buscamos el medicamento por su ID
    const medicamento = await this.medicamentoRepository.findOneBy({ id });

    if (!medicamento) {
      throw new Error('Medicamento no encontrado');
    }

    // Si se proporcionan los IDs de proveedor y categoria, los buscamos
    if (updateMedicamentoDto.proveedorId) {
      const proveedor = await this.proveedorRepository.findOneBy({ id: updateMedicamentoDto.proveedorId });
      if (proveedor) {
        medicamento.proveedor = proveedor;
      }
    }

    if (updateMedicamentoDto.categoriaId) {
      const categoria = await this.categoriaRepository.findOneBy({ id: updateMedicamentoDto.categoriaId });
      if (categoria) {
        medicamento.categoria = categoria;
      }
    }

    // Actualizamos las propiedades del medicamento
    Object.assign(medicamento, updateMedicamentoDto);

    // Guardamos el medicamento actualizado
    return this.medicamentoRepository.save(medicamento);
  }

  // Eliminar un medicamento por su ID
  async delete(id: number): Promise<Medicamentos | null> {
    const medicamento = await this.medicamentoRepository.findOneBy({ id });

    if (!medicamento) {
      throw new Error('Medicamento no encontrado');
    }

    // Eliminamos el medicamento
    return this.medicamentoRepository.remove(medicamento);
  }
}
