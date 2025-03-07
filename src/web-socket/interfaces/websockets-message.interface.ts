import { Message } from "src/messages/message.entity";

export interface ServerToClientEvents {
  Payload: Message;
}
