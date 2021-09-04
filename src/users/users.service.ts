import {Injectable, InternalServerErrorException, NotFoundException} from '@nestjs/common';
import {InjectModel, Prop} from '@nestjs/mongoose';
import {Model, Types} from 'mongoose';
import {User} from './models/user.schema';
import {Address} from './models/address.schema';
import {UserDto} from './models/dto/user.dto';
import {AddressDto} from './models/dto/address.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        @InjectModel(Address.name) private addressModel: Model<Address>
    ) {}

    public async getUsers(): Promise<User[]> {
        return this.userModel.find().populate('address').exec();
    }

    public async getUsersById(id: string): Promise<User> {
        return this.userModel.findById(id).populate('addresses', '', this.addressModel).exec();
    }

    public async createUser(user: UserDto): Promise<User> {
        const id = Types.ObjectId();
        const newUser: User = new this.userModel({
            _id: id,
            accountId: user.accountId,
            managers: user.managers,
            addressId: user.addressId,
            activity: user.activity,
            siret:  user.siret,
            isValid: user.isValid,
            lastUpdate: new Date()
        });
        return newUser.save();
    }

    public async createUserAddress(address: AddressDto, userId: string): Promise<Address> {
        const id = Types.ObjectId();

        try {
            await this.userModel.findOneAndUpdate({_id: userId}, {addressId: id, lastUpdate: new Date()});
        } catch (e) {
            throw new InternalServerErrorException(e);
        }

        const newUserAddress: Address = new this.addressModel({
            _id: id,
            street: address.street,
            city: address.city,
            state: address.state,
            postalCode: address.postalCode,
            country: address.country,
            lastUpdate: new Date()
        });
        return newUserAddress.save();
    }
}
