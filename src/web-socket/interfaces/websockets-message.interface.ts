import { Message } from "src/messages/message.entity";
import { ApiProperty } from "@nestjs/swagger";

/**
 * Interface representing events sent from the server to the client.
 */
export interface ServerToClientEvents {
  /**
   * Payload containing the message entity.
   */
  Payload: Message;
}
