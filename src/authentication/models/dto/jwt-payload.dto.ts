import {IsDefined, IsNotEmpty, IsString} from 'class-validator';
import {Roles} from '../roles.emum';

export class JwtPayloadDto {
    @IsString()
    @IsNotEmpty()
    @IsDefined()
    id: string;

    @IsString()
    @IsNotEmpty()
    @IsDefined()
    name: string;

    @IsNotEmpty()
    @IsDefined()
    role: Roles;
}
