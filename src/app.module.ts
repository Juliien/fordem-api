import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthenticationModule } from './authentication/authentication.module';
import { AccountsModule } from './accounts/accounts.module';
import { UsersModule } from './users/users.module';

require('dotenv').config();


@Module({
  imports: [
      MongooseModule.forRoot(process.env.MONGO_URI),
      AuthenticationModule,
      AccountsModule,
      UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
