import {ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Account, AccountDocument} from './models/account.schema';
import {Model, Types} from 'mongoose';
import {AccountDto} from './models/dto/account.dto';
import {Roles} from '../authentication/models/roles.emum';

@Injectable()
export class AccountsService {
    constructor(@InjectModel(Account.name) private accountModel: Model<AccountDocument>){}

    async getAccounts(): Promise<Account[]> {
        return await this.accountModel.find().exec();
    }

    async getAccountById(accountId: string): Promise<Account> {
        if(!Types.ObjectId.isValid(accountId))
            throw new ConflictException(`Invalid id #${accountId}`)

        const account = await this.accountModel.findById(accountId).exec();

        if (!account) {
            throw new NotFoundException(`Account #${accountId} does not exist!`);
        }

        return account;
    }

    async getAccountByEmail(accountEmail: string): Promise<Account> {
        return await this.accountModel.findOne({email: accountEmail}).exec();
    }

    async createAccounts(account: AccountDto): Promise<AccountDocument> {
        const newAccount: AccountDocument = new this.accountModel({
            email: account.email,
            password: account.password,
            phoneNumber: account.phoneNumber,
            role: Roles.ASSOCIATION,
            createDate: new Date()
        });

        return await newAccount.save();
    }
}
