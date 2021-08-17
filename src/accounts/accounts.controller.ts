import {Controller, Get, HttpStatus, Param, Res, UseGuards} from '@nestjs/common';
import {AccountsService} from './accounts.service';
import JwtAuthGuard from '../authentication/passport/jwt-auth.guard';

@Controller('accounts')
export class AccountsController {
    constructor(private readonly accountService: AccountsService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    async getAllUsers(@Res() res) {
        const accounts = await this.accountService.getAccounts();
        return res.status(HttpStatus.OK).json(accounts);
    }

    @Get(':id')
    async getAccountById(@Res() res, @Param('id') accountId: string) {
        const account = await this.accountService.getAccountById(accountId);
        return res.status(HttpStatus.OK).json(account);
    }
}
