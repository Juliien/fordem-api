import {ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Account, AccountDocument} from './models/account.schema';
import {Model, Types} from 'mongoose';
import {AccountDto} from './models/dto/account.dto';
import {Roles} from '../authentication/models/roles.emum';
import * as mongoose from 'mongoose';

@Injectable()
export class AccountsService {
    constructor(@InjectModel(Account.name) private accountModel: Model<AccountDocument>){}

    async getAccounts(): Promise<Account[]> {
        return this.accountModel.find().exec();
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
        return this.accountModel.findOne({ email: accountEmail }).exec();
    }

    async createAccounts(account: AccountDto): Promise<Account> {
        const accountId = mongoose.Types.ObjectId();
        let accountRole: string;
        switch (account.role) {
            case Roles.ASSOCIATION:
                accountRole = Roles.ASSOCIATION;
                break;
            case Roles.COMPANY:
                accountRole = Roles.COMPANY;
                break;
        }
        const newAccount: AccountDocument = new this.accountModel({
            _id: accountId,
            name: account.name,
            email: account.email,
            password: account.password,
            phoneNumber: account.phoneNumber,
            role: accountRole,
            createDate: new Date()
        });
        return newAccount.save();
    }
}
