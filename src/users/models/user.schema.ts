import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document, SchemaTypes, Types} from 'mongoose';

@Schema()
export class User extends Document {
    @Prop( { type: SchemaTypes.ObjectId })
    _id: string;

    @Prop({ type: SchemaTypes.ObjectId, ref: 'accounts' })
    accountId: string;

    @Prop({ type: SchemaTypes.ObjectId, ref: 'addresses' })
    addressId: Types.ObjectId;

    @Prop()
    managers: string[];

    @Prop()
    activity: string;

    @Prop()
    siret: string;

    @Prop()
    isValid: boolean;

    @Prop()
    createDate: Date;

    @Prop()
    lastUpdate: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
