import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './provider/user.service';
import { CreateUserDto } from './DTOs/create-user.dto';
import { EditUserDto } from './DTOs/patch-user.dto';
import { GetuserParamDto } from './DTOs/getUserparamdto';
import { PaginationQueryDto } from 'src/common/pagination/pagination-query.dto';
import { Paginated } from 'src/common/pagination/Interfaces/paginatedInterface';
import { User } from './user.entitly';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { authTypes } from 'src/auth/enums/authTypes.enum';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:id?')
  public getUsers(
    @Query() paginationQueryDto: PaginationQueryDto,
  ): Promise<Paginated<User>> {
    return this.userService.findAll(paginationQueryDto);
  }

  // Route to fetch a single user by ID
  @Get(':id')
  public getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOneById(id);
  }

  @Auth(authTypes.None)
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  public createUsers(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUsers(createUserDto);
  }

  @Delete()
  public deleteUser(@Query('id', ParseIntPipe) id: number) {
    return this.userService.deleteUser(id);
  }

  @Patch()
  public editedPost(@Body() edituserDto: EditUserDto) {
    return this.userService.editUser(edituserDto);
  }
}
