import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AccountDto } from '../accounts/models/dto/account.dto';
import {LoginDto} from './models/dto/login.dto';

@Controller('auth')
export class AuthenticationController {
    constructor(private readonly authService: AuthenticationService) {}

    @Post('register')
    async createOneUser(@Body() account: AccountDto) {
        return await this.authService.register(account);
    }

    @Post('login')
    async login(@Body() login: LoginDto) {
        return await this.authService.login(login);
    }
}
