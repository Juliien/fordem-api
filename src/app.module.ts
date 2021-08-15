import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthenticationModule } from './authentication/authentication.module';

require('dotenv').config();
const { MONGO_URI } = process.env;

@Module({
  imports: [
      MongooseModule.forRoot(MONGO_URI),
      AuthenticationModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
