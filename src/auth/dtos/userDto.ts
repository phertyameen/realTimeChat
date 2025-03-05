import { IsEmail, IsNotEmpty, IsString } from "class-validator";
/**Sign in dto class */
export class SignInDto {

  /**email parameter this string */
  @IsEmail()
  @IsNotEmpty()
  email: string;

  /**password parameter that is string */
  @IsString()
  @IsNotEmpty()
  password: string;
}