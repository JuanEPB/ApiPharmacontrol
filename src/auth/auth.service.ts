import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ){}

    async validateUser(email: string, contraseña: string): Promise<any>{
        const user = await this.usersService.findByEmail(email);
        if(user && await bcrypt.compare(contraseña, user.contraseña)){
            const {contraseña, ...result} = user;
            return result
        }

        return null;

    }

    async login(user: any){
        const payload = {correo: user.email, sub: user.id};
        return{
            access_token: this.jwtService.sign(payload),
        };
    }





}
