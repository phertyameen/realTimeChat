import { 
    IsString,
    IsEmail,
    IsNotEmpty,
    IsEnum,
    IsInt,
    IsOptional,

} from "class-validator";
import { userRole } from "../Enums/userRole.enum";
import { Moderator } from "../moderator.entity";


export class ModeratorDto {

    @IsNotEmpty()
    @IsInt()
    id:number;

    @IsEnum(userRole)
    @IsOptional()
    userRole?: Moderator;
    
}