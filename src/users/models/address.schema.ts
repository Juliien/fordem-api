import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document, SchemaTypes} from 'mongoose';

@Schema()
export class Address extends Document{
    @Prop( { type: SchemaTypes.ObjectId })
    _id: string;

    @Prop()
    street: string;

    @Prop()
    city: string;

    @Prop()
    state: string;

    @Prop()
    postalCode: string;

    @Prop()
    country: string;

    @Prop()
    lastUpdate: Date;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
