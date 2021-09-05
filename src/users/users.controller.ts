import {Body, Controller, Get, HttpStatus, InternalServerErrorException, Param, Post, Put, Res, UseGuards} from '@nestjs/common';
import {UserDto} from './models/dto/user.dto';
import {UsersService} from './users.service';
import JwtAuthGuard from '../authentication/passport/jwt-auth.guard';
import {AddressDto} from './models/dto/address.dto';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    // TODO - add admin role
    @Get()
    public async getAllUsers(@Res() res) {
        try {
            return res.status(HttpStatus.OK).json(await this.usersService.getUsers());
        } catch {
            return res.status(HttpStatus.BAD_REQUEST);
        }
    }

    @Post()
    public async addUser(@Res() res, @Body() user: UserDto) {
        const newUser = await this.usersService.createUser(user);
        return res.status(HttpStatus.CREATED).json(newUser);
    }

    @Get(':id')
    public async getUsersById(@Res() res, @Param('id') userId: string) {
        try {
            return res.status(HttpStatus.OK).json(await this.usersService.getUsersById(userId));
        } catch {
            return res.status(HttpStatus.BAD_REQUEST);
        }
    }

    @Put(':id')
    public async updateUsers(@Res() res, @Param('id') userId: string, @Body() userBody: UserDto) {
        try {
            return res.status(HttpStatus.OK).json(await this.usersService.updateUsers(userId, userBody));
        } catch (e) {
            throw new InternalServerErrorException(e);
        }
    }

    @Get(':id/address')
    public async getUserAddress(@Res() res, @Param('id') userId: string) {
        const newUser = await this.usersService.getUsersAddress(userId);
        return res.status(HttpStatus.OK).json(newUser);
    }

    @Post(':id/address')
    public async addUserAddress(@Res() res, @Body() address: AddressDto, @Param('id') userId: string) {
        const newUser = await this.usersService.createUserAddress(address, userId);
        return res.status(HttpStatus.CREATED).json(newUser);
    }

}
