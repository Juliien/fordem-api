import {ExtractJwt, Strategy} from 'passport-jwt';
import {PassportStrategy} from '@nestjs/passport';
import {Injectable, UnauthorizedException} from '@nestjs/common';
import {AccountsService} from '../../accounts/accounts.service';
import {Account} from '../../accounts/models/account.schema';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private accountService: AccountsService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET
        });
    }

    async validate(payload: any): Promise<Account> {
        const account = await this.accountService.getAccountById(payload.id);
        if(!account)
            throw new UnauthorizedException('Invalid token');

        return account;
    }
}
