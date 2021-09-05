import {IsDefined, IsEmail, IsNotEmpty, IsNumber, IsString, MinLength} from 'class-validator';
import {Roles} from '../../../authentication/models/roles.emum';

export class AccountDto {
    @IsEmail()
    @IsNotEmpty()
    @IsDefined()
    email: string;

    @IsString()
    @IsNotEmpty()
    @IsDefined()
    @MinLength(8)
    password: string;

    @IsString()
    @IsNotEmpty()
    @IsDefined()
    name: string;

    @IsNumber()
    @IsNotEmpty()
    @IsDefined()
    phoneNumber: number;

    @IsNotEmpty()
    @IsDefined()
    role: Roles;
}
