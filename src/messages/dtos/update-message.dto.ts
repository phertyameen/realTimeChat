import { PartialType } from "@nestjs/swagger";
import { IsInt, IsNotEmpty } from "class-validator";
import { CreateMessageDto } from "./create-message.dto";

/**
   * update message dto
   */
export class UpdateMessageDto extends PartialType(CreateMessageDto) {
    @IsInt()
    @IsNotEmpty()
    id: number;
}