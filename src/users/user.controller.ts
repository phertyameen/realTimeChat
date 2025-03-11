import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiParam, ApiBody } from '@nestjs/swagger';
import { UserService } from './provider/user.service';
import { CreateUserDto } from './DTOs/create-user.dto';
import { EditUserDto } from './DTOs/patch-user.dto';
import { PaginationQueryDto } from 'src/common/pagination/pagination-query.dto';
import { Paginated } from 'src/common/pagination/Interfaces/paginatedInterface';
import { User } from './user.entitly';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { authTypes } from 'src/auth/enums/authTypes.enum';
import { RoleDecorator } from 'src/auth/decorators/role-decorator';
import { Role } from 'src/auth/enums/role.enum';
import { RolesGuard } from 'src/auth/guard/roles-guard/role-guard';

/**
 * UserController handles all user-related operations.
 */
@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * Fetch a paginated list of users.
   * @param paginationQueryDto - Pagination parameters.
   * @returns A paginated list of users.
   */
  @ApiOperation({ summary: 'Get all users' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'List of users', type: [User] })
  @RoleDecorator(Role.Admin)
  @UseGuards(RolesGuard)
  @Get('/:id?')
  public getUsers(
    @Query() paginationQueryDto: PaginationQueryDto,
  ): Promise<Paginated<User>> {
    return this.userService.findAll(paginationQueryDto);
  }

  /**
   * Fetch a single user by ID.
   * @param id - User ID.
   * @returns A single user object.
   */
  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiParam({ name: 'id', required: true, type: Number })
  @ApiResponse({ status: 200, description: 'User found', type: User })
  @ApiResponse({ status: 404, description: 'User not found' })
  @Get(':id')
  public getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOneById(id);
  }

  /**
   * Create a new user.
   * @param createUserDto - User data transfer object.
   * @returns The created user.
   */
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'User created successfully', type: User })
  @Auth(authTypes.None)
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  public createUsers(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUsers(createUserDto);
  }

  /**
   * Delete a user by ID.
   * @param id - User ID.
   * @returns A confirmation message.
   */
  @ApiOperation({ summary: 'Delete a user' })
  @ApiQuery({ name: 'id', required: true, type: Number })
  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @Delete()
  public deleteUser(@Query('id', ParseIntPipe) id: number) {
    return this.userService.deleteUser(id);
  }

  /**
   * Edit an existing user.
   * @param edituserDto - User data to update.
   * @returns The updated user.
   */
  @ApiOperation({ summary: 'Edit a user' })
  @ApiBody({ type: EditUserDto })
  @ApiResponse({ status: 200, description: 'User updated successfully', type: User })
  @ApiResponse({ status: 404, description: 'User not found' })
  @Patch()
  public editedPost(@Body() edituserDto: EditUserDto) {
    return this.userService.editUser(edituserDto);
  }
}
