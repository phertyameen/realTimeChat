import { IsEmail, IsNotEmpty, IsString } from "class-validator";

/**signinDto class */
export class SignInDto {
  /**A unique email address of the user example:Rukky@gmail.com */
  @IsEmail()
  @IsNotEmpty()
  email: string;

  /**password of the user */
  @IsString()
  @IsNotEmpty()
  password: string;
}