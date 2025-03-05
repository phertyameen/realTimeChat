import { IsNotEmpty, IsString, } from "class-validator";

/**Refresh token dto class */
export class RefreshTokenDto {

    /**refresh token of type string */
    @IsString()
    @IsNotEmpty()
    refreshToken: string
}