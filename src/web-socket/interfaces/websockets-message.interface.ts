
import { Message } from "src/messages/message.entity";

export interface ServerToClientEvents {
    newMessage: (payload:Message) => void
}