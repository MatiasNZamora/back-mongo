import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';


import { OperadoresService } from 'src/operadores/services/operadores.service';

@Injectable()
export class AuthService {
    constructor( private operadorService:OperadoresService ){}


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
}
