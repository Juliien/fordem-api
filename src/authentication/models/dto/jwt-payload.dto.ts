import {IsDefined, IsEmail, IsNotEmpty, IsString} from 'class-validator';
import {Roles} from '../roles.emum';

export class JwtPayloadDto {
    @IsString()
    @IsNotEmpty()
    @IsDefined()
    id: string;


    @IsString()
    @IsEmail()
    @IsNotEmpty()
    @IsDefined()
    email: string;

    @IsNotEmpty()
    @IsDefined()
    role: Roles;
}
