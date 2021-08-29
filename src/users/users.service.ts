import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {User, UserDocument} from './models/user.schema';
import {Address, AddressDocument} from './models/address.schema';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        @InjectModel(Address.name) private addressModel: Model<AddressDocument>
    ) {}

    
}
