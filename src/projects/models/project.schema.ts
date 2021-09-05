import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document, SchemaTypes} from 'mongoose';

@Schema()
export class Project extends Document {
    @Prop( { type: SchemaTypes.ObjectId })
    _id: string;

    @Prop({ type: SchemaTypes.ObjectId, ref: 'User' })
    userId: string;

    @Prop()
    title: string;

    @Prop()
    description: string;

    @Prop()
    targetAmount: string;

    @Prop()
    currentAmount: string;

    @Prop()
    createDate: Date;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
