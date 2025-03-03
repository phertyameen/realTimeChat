import { IsInt } from "class-validator";
import { Type } from 'class-transformer';

export class GetuserParamDto {
   
    @IsInt()
    @Type (() => Number )
    id?:number

}