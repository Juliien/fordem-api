import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {Project} from './models/project.schema';

@Injectable()
export class ProjectsService {
    constructor(@InjectModel(Project.name) private userModel: Model<Project>){}
}
