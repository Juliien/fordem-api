import {ConflictException, Injectable} from '@nestjs/common';
import {Account, AccountDocument} from './models/account.schema';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {AccountDto} from './models/dto/account.dto';
import {Roles} from './models/roles.emum';
import {hash} from 'bcrypt'

@Injectable()
export class AuthenticationService {
    constructor(
        @InjectModel(Account.name) private accountModel: Model<AccountDocument>
    ) {}

    async createAccount(registrationData: AccountDto): Promise<AccountDocument> {
        const emailCheck = await this.accountModel.findOne({ email: registrationData.email });

        if (emailCheck)
            throw new ConflictException(null, 'this email already exists');

        const hashPassword = await hash(registrationData.password, 10);

        const newAccount: AccountDocument = new this.accountModel({
            email: registrationData.email,
            password: hashPassword,
            phoneNumber: registrationData.phoneNumber,
            role: Roles.ASSOCIATION,
            createDate: new Date()
        });

        const account = await newAccount.save();
        account.password = undefined;

        return account;
    }

    async getAll() {
        return await this.accountModel.find().exec();
    }
}
