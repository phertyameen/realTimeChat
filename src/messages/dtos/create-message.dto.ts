import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { User } from "src/users/user.entitly";

export class CreateMessageDto {
    @IsNotEmpty()
    chatRoomId: string;

    @IsString()
    @IsNotEmpty()
    text: string;
  }  