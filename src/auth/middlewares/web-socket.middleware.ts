import { Socket } from "socket.io"
import { WebSocketGuardGuard } from "../guard/web-socket-guard/web-socket-guard.guard"

export type SocketIoMiddleware = {
    (client: Socket, next: (err?: Error) => void)
}

export const SocketAuthMiddleware = ():SocketIoMiddleware => {
    return (client, next) => {
        try {
            WebSocketGuardGuard.validateToken(client)
        } catch (error) {
            next(error)
        }
    }
}