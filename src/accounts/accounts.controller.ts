import {Controller, Get, Param, UseGuards} from '@nestjs/common';
import {AccountsService} from './accounts.service';
import JwtAuthGuard from '../authentication/passport/jwt-auth.guard';

@Controller('accounts')
export class AccountsController {
    constructor(private readonly accountService: AccountsService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    async getAllUsers() {
        return await this.accountService.getAccounts();
    }

    @Get(':id')
    async getAccountById(@Param('id') accountId: string) {
        const res = await this.accountService.getAccountById(accountId);
        console.log(res);
        return res;
    }
}
