
import { IsEmail, IsInt, IsNotEmpty, IsString } from "class-validator";
import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./create-user.dto";

 
/**using the patch to edit part of the data, the partialtype makes everything optional */ 
export class EditUserDto extends PartialType(CreateUserDto) {

    /**a unique id of number used to edit create user dto */
    @IsInt()
    @IsNotEmpty()
    id: number;
}

