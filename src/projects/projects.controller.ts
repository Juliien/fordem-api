import {Body, Controller, Get, HttpStatus, Param, Post, Res} from '@nestjs/common';
import {ProjectsService} from './projects.service';
import {ProjectDto} from './models/dto/project.dto';

// TODO - add authentication guard
@Controller('projects')
export class ProjectsController {
    constructor(private projectService: ProjectsService) {}

    @Post()
    public async addProject(@Res() res, @Body() project: ProjectDto) {
        return res.status(HttpStatus.CREATED).json(await this.projectService.createProject(project));
    }

    @Get('user/:id')
    public async getProjectsByUser(@Res() res, @Param('id') userId: string) {
        try {
            return res.status(HttpStatus.OK).json(await this.projectService.getUsersProjects(userId));
        } catch {
            return res.status(HttpStatus.BAD_REQUEST);
        }
    }

    @Get(':id')
    public async getProjectsById(@Res() res, @Param('id') id: string) {
        try {
            return res.status(HttpStatus.OK).json(await this.projectService.getProjectById(id));
        } catch {
            return res.status(HttpStatus.BAD_REQUEST);
        }
    }

    @Get()
    public async getAllProjects(@Res() res) {
        try {
            return res.status(HttpStatus.OK).json(await this.projectService.getProjects());
        } catch {
            return res.status(HttpStatus.BAD_REQUEST);
        }
    }
}

