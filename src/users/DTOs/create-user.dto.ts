import { 
    IsString,
    IsEmail,
    IsNotEmpty,
    IsEnum,
    IsOptional,
} from "class-validator";
import { Column } from "typeorm";
import { userRole } from "../Enums/userRole.enum";



export class CreateUserDto {

    @Column()
    @IsNotEmpty()
    @IsString()
    firstName: string;
    

    @Column()
    @IsNotEmpty()
    @IsString()
    lastName: string;

    @Column()
    @IsEmail()
    @IsNotEmpty()
    @IsString()
    email: string;

    @Column()
    @IsString()
    @IsNotEmpty()
    password: string;

    @Column()
    @IsString()
    @IsNotEmpty()
    confirmpassword: string;
    
    @IsEnum(userRole)
    @IsOptional()
    userRole?: userRole;
    
}