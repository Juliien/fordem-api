import {IsDefined, IsNotEmpty, IsString} from 'class-validator';
import {Roles} from '../roles.emum';
import * as mongoose from 'mongoose';

export class JwtPayloadDto {
    @IsString()
    @IsNotEmpty()
    @IsDefined()
    id: mongoose.Types.ObjectId;

    @IsNotEmpty()
    @IsDefined()
    role: Roles;
}
