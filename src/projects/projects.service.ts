import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model, Types} from 'mongoose';
import {Project} from './models/project.schema';
import {ProjectDto} from './models/dto/project.dto';

@Injectable()
export class ProjectsService {
    constructor(@InjectModel(Project.name) private projectModel: Model<Project>){}

    public async createProject(project: ProjectDto): Promise<Project> {
        const id = Types.ObjectId();

        const newProject: Project = new this.projectModel({
            _id: id,
            userId: project.userId,
            title: project.title,
            description: project.description,
            targetAmount: project.targetAmount,
            currentAmount: 0,
            createDate: new Date()
        });

        return newProject.save();
    }

    public async getUsersProjects(id: string): Promise<Project[]> {
        return this.projectModel.find({userId: id}).exec();
    }

    public async getProjectById(id: string): Promise<Project> {
        return this.projectModel.findById(id).exec();
    }

    public async getProjects(): Promise<Project[]> {
        return this.projectModel.find().exec();
    }

}
