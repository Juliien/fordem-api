import {ConflictException, ForbiddenException, Injectable, UnauthorizedException} from '@nestjs/common';
import {Account} from '../accounts/models/account.schema';
import {AccountDto} from '../accounts/models/dto/account.dto';
import {compare, hash} from 'bcrypt';
import {AccountsService} from '../accounts/accounts.service';
import {LoginDto} from './models/dto/login.dto';
import {JwtService} from '@nestjs/jwt';

@Injectable()
export class AuthenticationService {
    constructor(
        private readonly accountsService: AccountsService,
        private readonly jwtService: JwtService
    ) {}

    async register(registrationData: AccountDto): Promise<Account> {
        const emailCheck = await this.accountsService.getAccountByEmail(registrationData.email);

        if (emailCheck)
            throw new ConflictException(null, 'this email already exists');

        registrationData.password = await hash(registrationData.password, 10);

        const account = await this.accountsService.createAccounts(registrationData);
        account.password = undefined;

        return account;
    }

    async login(login: LoginDto): Promise<any> {
        const account = await this.accountsService.getAccountByEmail(login.email);

        if (!account)
            throw new ForbiddenException(null,'Account not found');

        const isPasswordEquals = await compare(login.password, account.password);

        if (!isPasswordEquals)
            throw new UnauthorizedException(null,'Invalid credentials');

        const payload = { id: account._id, role: account.role };
        return { token: this.jwtService.sign(payload)};
    }
}
