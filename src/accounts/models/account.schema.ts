import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Roles} from '../../authentication/models/roles.emum';
import {Document, SchemaTypes} from 'mongoose';

export type AccountDocument = Account & Document;

@Schema()
export class Account {
    @Prop( { type: SchemaTypes.ObjectId })
    _id: string;

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
