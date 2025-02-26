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
import { Auth } from 'src/auth/decorators/auth.decorator';
import { authTypes } from 'src/auth/enums/authTypes.enum';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:id?')
  public getUsers(
    @Param() getuserParamDto: GetuserParamDto,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    console.log(getuserParamDto);
    return this.userService.findAll(getuserParamDto, limit, page);
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
