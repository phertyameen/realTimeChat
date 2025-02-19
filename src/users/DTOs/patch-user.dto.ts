
import { IsEmail, IsInt, IsNotEmpty, IsString } from "class-validator";
import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./create-user.dto";

 
/**using the patch to edit part of the data, the partialtype makes everything optional */ 
export class EditUserDto extends PartialType(CreateUserDto) {
    /**unique identifier id */
    @IsInt()
    @IsNotEmpty()
    id: number;
}

