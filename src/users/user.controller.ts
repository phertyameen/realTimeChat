import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from "@nestjs/common";
import { UserService } from "./provider/user.service";
import { CreateUserDto } from "./DTOs/create-user.dto";
import { EditUserDto } from "./DTOs/patch-user.dto";
import { GetuserParamDto } from "./DTOs/getUserparamdto";
import { ApiTags, ApiOperation, ApiQuery, ApiParam, ApiBody, ApiResponse } from "@nestjs/swagger";

/**
  Controller for managing user-related operations.
 */
@Controller('users')
export class UserController {
    /**constructor for injecting user service */
    constructor(private readonly userService:UserService) {}

    /**
      Retrieves a list of users or a single user if an ID is provided.
      @param {GetuserParamDto} getuserParamDto - Optional user ID parameter.
      @param {number} limit - The number of users per page (default: 20).
      @param {number} page - The page number for pagination (default: 1).
      @returns {Promise<any>} A list of users or a specific user if ID is provided.
     */
      @ApiOperation({ summary: 'Retrieve users or a single user by ID' })
      @ApiParam({ name: 'id', required: false, description: 'User ID (optional)' })
      @ApiQuery({ name: 'limit', required: false, description: 'Number of users per page', example: 20 })
      @ApiQuery({ name: 'page', required: false, description: 'Page number for pagination', example: 1 })
      @ApiResponse({ status: 200, description: 'Successful retrieval of users' })
      @Get('/:id?')
  
      /**Get user method */
    @Get('/:id?')
  public getUsers(
    @Param() getuserParamDto: GetuserParamDto,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    console.log(getuserParamDto);
    return this.userService.findAll(getuserParamDto, limit, page);
  }

  /**
    Creates a new user.
      @param {CreateUserDto} createUserDto - User data transfer object.
      @returns {Promise<any>} The newly created user.
     */
      @ApiOperation({ summary: 'Create a new user' })
      @ApiBody({ type: CreateUserDto, description: 'User data' })
      @ApiResponse({ status: 201, description: 'User successfully created' })
  /**Create a user method */
@Post()
  public createUsers(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUsers(createUserDto);
  }
  
  /**
     Deletes a user by ID.
      @param {number} id - The ID of the user to delete.
      @returns {Promise<any>} A confirmation message.
     */
      @ApiOperation({ summary: 'Delete a user by ID' })
      @ApiQuery({ name: 'id', required: true, description: 'User ID', example: 1 })
      @ApiResponse({ status: 200, description: 'User successfully deleted' })

  /**Delete a user method */
  @Delete()
  public deleteUser(@Query('id', ParseIntPipe) id:number)  {
      return this.userService.deleteUser(id)

  }

  /**
      Updates user details.
      @param {EditUserDto} edituserDto - Updated user data.
      @returns {Promise<any>} The updated user details.
     */
      @ApiOperation({ summary: 'Update user details' })
      @ApiBody({ type: EditUserDto, description: 'Updated user data' })
      @ApiResponse({ status: 200, description: 'User successfully updated' })
  

  /**Update or edit  a user method */
  @Patch()
  public editedPost(@Body() edituserDto: EditUserDto) {
    return this.userService.editUser(edituserDto);
  }


}