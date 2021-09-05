import {Injectable, InternalServerErrorException, NotFoundException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
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
        return this.userModel.find().exec();
    }

    public async getUsersById(id: string): Promise<User> {
        return this.userModel.findById(id).exec();
    }

    public async getUsersAddress(id: string): Promise<Address> {
        const user: User = await this.getUsersById(id);
        if(!user) {
            throw new NotFoundException(`User ${id} does not exist !`)
        }
        return this.addressModel.findById(user.addressId).exec();
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
            isValid: false,
            createDate: new Date()
        });
        return newUser.save();
    }

    public async createUserAddress(address: AddressDto, userId: string): Promise<Address> {
        const id = Types.ObjectId();
        try {
            await this.userModel.findByIdAndUpdate(userId, {addressId: id, lastUpdate: new Date()});
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

    public async updateUsers(userId: string, userDto: UserDto): Promise<User> {
        const user = await this.userModel.findByIdAndUpdate(userId, {
            lastUpdate: new Date(),
            managers: userDto.managers,
            activity: userDto.activity
        });

        if (!user) {
            throw new NotFoundException(`User #${userId} not found`);
        }

        return this.userModel.findById(userId);
    }

    public async updateUsersAddress(addressId: string, address: AddressDto): Promise<Address> {
        address.lastUpdate = new Date();
        const updatedAddress: Address = await this.addressModel.findByIdAndUpdate(addressId, address);

        if (!updatedAddress) {
            throw new NotFoundException(`Address #${addressId} not found`);
        }

        return this.addressModel.findById(addressId);
    }

    public async userValidation(id: string): Promise<User> {
        const user: User = await this.userModel.findByIdAndUpdate(id, {isValid: true});

        if (!user) {
            throw new NotFoundException(`User #${id} not found`);
        }

        return this.userModel.findById(id);
    }
}
