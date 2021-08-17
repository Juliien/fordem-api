import {Body, Controller, Get, Headers, HttpStatus, Post, Res, UseGuards} from '@nestjs/common';
import {AuthenticationService} from './authentication.service';
import {AccountDto} from '../accounts/models/dto/account.dto';
import {LoginDto} from './models/dto/login.dto';
import JwtAuthGuard from './passport/jwt-auth.guard';

@Controller('auth')
export class AuthenticationController {
    constructor(private readonly authService: AuthenticationService) {}

    @Post('register')
    async createOneUser(@Res() res, @Body() account: AccountDto) {
        const registeredAccount = await this.authService.register(account);
        return res.status(HttpStatus.CREATED).json(registeredAccount)
    }

    @Post('login')
    async login(@Res() res, @Body() login: LoginDto) {
        const token = await this.authService.login(login);
        return res.status(HttpStatus.OK).json(token);
    }

    @UseGuards(JwtAuthGuard)
    @Get('token')
    async getTokenContent(@Res() res, @Headers() headers: any) {
        const token = await this.authService.decodeToken(headers.authorization.replace('Bearer', '').trim());
        return res.status(HttpStatus.OK).json(token);
    }

    @Get('token/refresh')
    async refreshToken(@Res() res, @Headers() headers: any) {
        const token = await this.authService.refreshToken(headers.authorization.replace('Bearer', '').trim());
        return res.status(HttpStatus.OK).json(token);
    }
}
