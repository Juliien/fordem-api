import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Roles} from '../../authentication/models/roles.emum';
import {Document, SchemaTypes} from 'mongoose';

@Schema()
export class Account extends Document {
    @Prop( { type: SchemaTypes.ObjectId })
    _id: string;

    @Prop()
    name: string;x

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
