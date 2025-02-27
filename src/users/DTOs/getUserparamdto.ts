import { IsOptional,IsInt } from "class-validator";
import { Type } from 'class-transformer';
import { ApiProperty } from "@nestjs/swagger";

export class GetuserParamDto {
   @ApiProperty({type:'number',
    example:1,
   })
    @IsInt()
    @Type (() => Number )
    id?:number

}