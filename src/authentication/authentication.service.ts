import {ConflictException, ForbiddenException, Injectable, UnauthorizedException} from '@nestjs/common';
import {Account} from '../accounts/models/account.schema';
import {AccountDto} from '../accounts/models/dto/account.dto';
import {compare, hash} from 'bcrypt';
import {AccountsService} from '../accounts/accounts.service';
import {LoginDto} from './models/dto/login.dto';
import {JwtService} from '@nestjs/jwt';
import {JwtPayloadDto} from './models/dto/jwt-payload.dto';

@Injectable()
export class AuthenticationService {
    constructor(
        private readonly accountsService: AccountsService,
        private readonly jwtService: JwtService
    ) {}

    async register(registrationData: AccountDto): Promise<Account> {
        const emailCheck = await this.accountsService.getAccountByEmail(registrationData.email);

        if (emailCheck)
            throw new ConflictException('This email already exists');

        registrationData.password = await hash(registrationData.password, 10);
        const account = await this.accountsService.createAccounts(registrationData);
        account.password = undefined;
        return account;
    }

    async login(login: LoginDto): Promise<any> {
        const account = await this.accountsService.getAccountByEmail(login.email);

        if (!account)
            throw new UnauthorizedException('Invalid credentials');

        const isPasswordEquals = await compare(login.password, account.password);

        if (!isPasswordEquals)
            throw new UnauthorizedException('Invalid credentials');

        const jwtPayload: JwtPayloadDto = {
            id: account._id,
            email: account.email,
            role: account.role
        };
        return { token: this.jwtService.sign(jwtPayload) };
    }

    async refreshToken(token: string) {
        const decodedToken = await this.decodeToken(token);

        if(decodedToken.exp > (Date.now() / 1000))
            throw new UnauthorizedException('Token is valid')

        const account = await this.accountsService.getAccountById(decodedToken.id);

        if(!account)
            throw new ForbiddenException('Can\'t refresh token');

        const jwtPayload: JwtPayloadDto = {
            id: account._id,
            email: account.email,
            role: account.role
        };
        return { token: this.jwtService.sign(jwtPayload) };
    }

    async decodeToken(token: string): Promise<any> {
        return this.jwtService.decode(token);
    }
}
