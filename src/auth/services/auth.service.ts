import { Injectable } from '@nestjs/common';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { OperadoresService } from 'src/operadores/services/operadores.service';
import { Operador } from 'src/operadores/entities/operador.entity';
import { PayloadToken } from '../models/token.model';


@Injectable()
export class AuthService {
    constructor( 
        private operadorService:OperadoresService,
        private jwtService: JwtService,
    ){}


    async validateUser( email: string, password: string ){
        const operadores = await this.operadorService.findByEmail(email);
        
        if(operadores){
            const isMatch = await bcrypt.compare(password, operadores.password);
            
            if(isMatch){
                const { password, ...rta } = operadores.toJSON();
                return rta;
            } 
        }
        
        return null;
    }

    generateJWT(operador: Operador){
        const payload: PayloadToken = { role: operador.role, sub: operador.id }; // datos a firmar
        return {
            access_token: this.jwtService.sign(payload), // genera el token de acceso con la firma de payload
            operador,
        };
    }
}
