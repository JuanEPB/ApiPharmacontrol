import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Put,
    NotFoundException,
    Delete,
    UseGuards,
    Request,
  } from '@nestjs/common';
  import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
  import { UsersService } from './users.service';
  import { CreateUsuarioDto } from './dto/create_users.dto';
  import { UpdateUsuarioDto } from './dto/update_users.dto';
import { Usuario } from './entity/users.entity';
  
  @Controller('users')
  export class UsersController {
    constructor(private readonly usersService: UsersService) {}
  
    @Get('all')
    findAll() {
      return this.usersService.findAll();
    }
  
    @Get(':id')
    async findOne(@Param('id') id: number) {
      const user = await this.usersService.findOne(id);
      if (!user) {
        throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
      }
      return user;
    }
    @Get('/email/:email')
    async findByEmail(@Param('email') email: string){
      const user  = await this.usersService.findByEmail(email);
      if (!user) {
        throw new NotFoundException(`Usuario con el correo ${email} no encontrado`);
      }
      return user;
    }
  
    @Post('create')
    create(@Body() createUsuarioDto: CreateUsuarioDto) {
      return this.usersService.create(createUsuarioDto);
    }
  
    @Put('update/:id')
    update(@Param('id') id: number, @Body() updateUsuarioDto: UpdateUsuarioDto) {
      return this.usersService.update(id, updateUsuarioDto);
    }

    @Delete('delete/:id')
    delete(@Param('id') id: number): Promise<Usuario | null>{
        return this.usersService.findAndDelete(id)

    }

    @UseGuards(JwtAuthGuard)
    @Get('perfil')
    getPerfil(@Request() req) {
      return req.user;
    }
  }

  
  