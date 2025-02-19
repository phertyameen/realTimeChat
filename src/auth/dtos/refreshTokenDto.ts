import { IsNotEmpty, IsString, } from "class-validator";

/**refresh tokendto class */
export class RefreshTokenDto {

    /**refreshToken of type string */
    @IsString()
    @IsNotEmpty()
    refreshToken: string
}