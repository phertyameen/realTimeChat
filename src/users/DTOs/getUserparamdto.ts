import { IsOptional,IsInt } from "class-validator";
import { Type } from 'class-transformer';

/**Get users paramsdto class */
export class GetuserParamDto {
   
     /**Unique identifier id */
    @IsInt()
    @Type (() => Number )
    id?:number

}