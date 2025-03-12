import { PartialType } from "@nestjs/swagger";
import { IsInt, IsNotEmpty } from "class-validator";
import { CreateMessageDto } from "./create-message.dto";


export class UpdateMessageDto extends PartialType(CreateMessageDto) {
     /**
   * The ID of the message to be updated.
   */
    @IsInt()
    @IsNotEmpty()
    id: number;
    
}