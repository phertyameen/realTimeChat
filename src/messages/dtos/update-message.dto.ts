import { PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { CreateMessageDto } from "./create-message.dto";

export class UpdateMessageDto extends PartialType(CreateMessageDto) {
    @IsString()
    @IsNotEmpty({ message: 'Message text cannot be empty' })
    text: string;
}