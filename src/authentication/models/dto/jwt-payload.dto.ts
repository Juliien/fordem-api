import {IsDefined, IsNotEmpty, IsString} from 'class-validator';
import {Roles} from '../roles.emum';

export class JwtPayloadDto {
    @IsString()
    @IsNotEmpty()
    @IsDefined()
    id: string;

    @IsNotEmpty()
    @IsDefined()
    role: Roles;
}
