import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document, SchemaTypes, Types} from 'mongoose';

@Schema()
export class User extends Document {
    @Prop( { type: SchemaTypes.ObjectId })
    _id: string;

    @Prop()
    accountId: string;

    @Prop()
    managers: string[];

    @Prop({ type: SchemaTypes.ObjectId, ref: 'Address' })
    addressId: Types.ObjectId;

    @Prop()
    activity: string;

    @Prop()
    siret: string;

    @Prop()
    isValid: boolean;

    @Prop()
    lastUpdate: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
