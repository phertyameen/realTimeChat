import { 
    IsString,
    IsEmail,
    IsNotEmpty,
    IsEnum,
    IsInt,
    IsOptional,

} from "class-validator";
import { Admin, Column } from "typeorm";
import { userRole } from "../Enums/userRole.enum";
// import { userRole } from "../Enums/userRole.enum";



export class CreateAdminDto {

    @IsNotEmpty()
    @IsInt()
    id:number;
    
    @Column()
    @IsNotEmpty()
    @IsString()
    name: string;

    @Column()
    @IsNotEmpty()
    @IsString()
    createdBy: string;

    @IsEnum(userRole)
    @IsOptional()
    userRole?: Admin;
    
}