import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthenticationModule } from './authentication/authentication.module';
import { AccountsModule } from './accounts/accounts.module';

require('dotenv').config();


@Module({
  imports: [
      MongooseModule.forRoot(process.env.MONGO_URI),
      AuthenticationModule,
      AccountsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
