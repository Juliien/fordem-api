import { Injectable } from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Account, AccountDocument} from './models/account.schema';
import {Model} from 'mongoose';
import {AccountDto} from './models/dto/account.dto';
import {Roles} from '../authentication/models/roles.emum';

@Injectable()
export class AccountsService {
    constructor(@InjectModel(Account.name) private accountModel: Model<AccountDocument>){}

    async getAccounts(): Promise<Account[]> {
        return await this.accountModel.find().exec();
    }

    async getAccountById(accountId: string): Promise<Account> {
        return await this.accountModel.findOne({_id: accountId}).exec();
    }

    async getAccountByEmail(accountEmail: string): Promise<Account> {
        return await this.accountModel.findOne({email: accountEmail}).exec();
    }

    async createAccounts(_account: AccountDto): Promise<AccountDocument> {
        const newAccount: AccountDocument = new this.accountModel({
        email: _account.email,
        password: _account.password,
        phoneNumber: _account.phoneNumber,
        role: Roles.ASSOCIATION,
        createDate: new Date()
        });

        return await newAccount.save();
    }
}
