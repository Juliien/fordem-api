import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Roles } from '../../authentication/models/roles.emum';

export type AccountDocument = Account & Document;

@Schema()
export class Account {
    @Prop({ type: Types.ObjectId })
    _id: string

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
