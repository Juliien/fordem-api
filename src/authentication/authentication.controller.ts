import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AccountDto } from './models/dto/account.dto';

@Controller('auth')
export class AuthenticationController {
    constructor(private readonly authService: AuthenticationService) {}

    @Post('register')
    async createOneUser(@Body() account: AccountDto) {
        return await this.authService.createAccount(account);
    }

    @Get('accounts')
    getAllUsers() {
        return this.authService.getAll();
    }
}
