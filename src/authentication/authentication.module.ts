import {Module} from '@nestjs/common';
import {AuthenticationService} from './authentication.service';
import {AuthenticationController} from './authentication.controller';
import {AccountsModule} from '../accounts/accounts.module';
import {PassportModule} from '@nestjs/passport';
import {JwtModule} from '@nestjs/jwt';
import {JwtStrategy} from './passport/jwt.strategy';

require("dotenv").config();

@Module({
    imports: [
        AccountsModule,
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: process.env.JWT_EXPIRATION }
        }),
    ],
    providers: [AuthenticationService, JwtStrategy],
    controllers: [AuthenticationController]
})
export class AuthenticationModule {}
