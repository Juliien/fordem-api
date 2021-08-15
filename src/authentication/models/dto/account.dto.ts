import {IsDate, IsDefined, IsEmail, IsEmpty, IsNotEmpty, IsNumber, IsString, Length, MinLength} from 'class-validator';
import {Roles} from '../roles.emum';


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

    @IsNumber()
    @IsNotEmpty()
    @IsDefined()
    @Length(10)
    phoneNumber: number;

    @IsNotEmpty()
    @IsDefined()
    role: Roles;

    @IsDate()
    @IsNotEmpty()
    @IsDefined()
    createDate: Date;

    @IsEmpty()
    closeDate: Date;
}
