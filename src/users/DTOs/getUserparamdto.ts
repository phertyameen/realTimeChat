import { IsOptional, IsInt } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from "@nestjs/swagger";

/**Get userParamdto  class */
export class GetuserParamDto {

    /**A unique id that is optional and of type number */
   @ApiProperty({type:'number',
    example:1,
   })
    @IsInt()
    @Type (() => Number )
    id?:number

}