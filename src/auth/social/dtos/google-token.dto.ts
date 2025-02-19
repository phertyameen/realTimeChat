import {IsNotEmpty} from 'class-validator'

/**class for GoogleTokendto */
export class GoogleTokenDto {

     /**The Token of type string */
    @IsNotEmpty()
    token: string
}