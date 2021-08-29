import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document, SchemaTypes} from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop( { type: SchemaTypes.ObjectId })
    _id: string;

    @Prop()
    accountId: string;

    @Prop()
    managers: string[];

    @Prop()
    headquarters: string;

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
