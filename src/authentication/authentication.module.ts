import { Module } from '@nestjs/common';
import { Account, AccountSchema } from './models/account.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';

@Module({
    imports: [MongooseModule.forFeature([{ name: Account.name, schema: AccountSchema }])],
    providers: [AuthenticationService],
    controllers: [AuthenticationController]
})
export class AuthenticationModule {}
