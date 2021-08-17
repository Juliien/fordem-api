import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Roles} from '../../authentication/models/roles.emum';
import * as mongoose from 'mongoose';
import {Document} from 'mongoose';

export type AccountDocument = Account & Document;

@Schema()
export class Account {
    @Prop({ type: mongoose.Schema.Types.ObjectId })
    _id: mongoose.Types.ObjectId;

    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop()
    phoneNumber: number;

    @Prop()
    role: Roles;

    @Prop()
    createDate: Date;

    @Prop()
    closeDate: Date;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
