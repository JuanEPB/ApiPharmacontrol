import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Medicamentos } from './entity/products.entity';
import { Between, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { Proveedor } from 'src/proveedor/entity/proveedor.entity';
import { Categoria } from 'src/categorias/entity/categorias.entity';
import { CreateMedicamentoDto } from './dto/create_product.dto';
import { UpdateMedicamentoDto } from './dto/update_medicamento.dto';
import { LessThan } from 'typeorm';

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

    if (medicamento.lote){
      

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

  async contarMedicamentos(): Promise<number> {
    return await this.medicamentoRepository.count();
  }

  async countByName(name: string): Promise<{ total: number }> {
    const count = await this.medicamentoRepository.count({
      where: { nombre: name },
    });
    return { total: count };
  }
  
  async dataCaducidadMedicamentos(): Promise<{ total: number, medicamentos: Medicamentos[] }> {
  const today = new Date();
  const monthsLater = new Date();
  monthsLater.setMonth(today.getMonth() + 18);  
  const medicamentos = await this.medicamentoRepository.find({
    where: {
      caducidad: Between(today, monthsLater), // Medicamentos que caducan entre hoy y 18 meses
    },
    relations: ['proveedor', 'categoria'],
  });
  const total = medicamentos.length;
  return { total, medicamentos };
}


async caducidadMedicamentos(): Promise<Medicamentos[]> {
  const today = new Date();
  const monthsLater = new Date();
  monthsLater.setMonth(today.getMonth() + 18);

  return this.medicamentoRepository.find({
    where: {
      caducidad: Between(today, monthsLater), // Medicamentos que caducan entre hoy y 3 meses
    },
    relations: ['proveedor', 'categoria'],
  });
}

  async lowStockMedicamentos(): Promise<Medicamentos[]> {
    return this.medicamentoRepository.find({
      where: {
        stock: LessThan(10), // Filtra medicamentos cuyo stock es menor a 10
      },
      relations: ['proveedor', 'categoria'], // Incluye relaciones si es necesario
    });
  }

  async findByName(name: string): Promise<Medicamentos[]> {
    return this.medicamentoRepository.find({
      where: {
        nombre: name,
      },
      relations: ['proveedor', 'categoria'], // Incluye relaciones si es necesario
    });
  }

  async findByLote(lote: string): Promise<Medicamentos[]> {
    return this.medicamentoRepository.find({
      where: {
        lote: lote,
      },
      relations: ['proveedor', 'categoria'], // Incluye relaciones si es necesario
    });
  }
  async findByCaducidad(caducidad: Date): Promise<Medicamentos[]> {
    return this.medicamentoRepository.find({
      where: {
        caducidad: caducidad,
      },
      relations: ['proveedor', 'categoria'], // Incluye relaciones si es necesario
    });
  }
  async findByStock(stock: number): Promise<Medicamentos[]> {
    return this.medicamentoRepository.find({
      where: {
        stock: stock,
      },
      relations: ['proveedor', 'categoria'], // Incluye relaciones si es necesario
    });
  }
  async findByPrecio(precio: number): Promise<Medicamentos[]> {
    return this.medicamentoRepository.find({
      where: {
        precio: precio,
      },
      relations: ['proveedor', 'categoria'], // Incluye relaciones si es necesario
    });
  }
  async findByProveedor(proveedorId: number): Promise<Medicamentos[]> {
    return this.medicamentoRepository.find({
      where: {
        proveedor: { id: proveedorId },
      },
      relations: ['proveedor', 'categoria'], // Incluye relaciones si es necesario
    });
  }
  async findByCategoria(categoriaId: number): Promise<Medicamentos[]> {
    return this.medicamentoRepository.find({
      where: {
        categoria: { id: categoriaId },
      },
      relations: ['proveedor', 'categoria'], // Incluye relaciones si es necesario
    });
  }

  
}
