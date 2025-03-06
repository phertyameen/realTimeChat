import { Socket } from "socket.io";
import { WebSocketGuardGuard } from "../guard/web-socket-guard/web-socket-guard.guard";

/**
 * @typedef {Function} SocketIoMiddleware
 * @description Middleware function for handling authentication in WebSocket connections.
 * @param {Socket} client - The client socket instance.
 * @param {(err?: Error) => void} next - Callback function to proceed to the next middleware or handle an error.
 */

/**SocketIo middle ware type */
export type SocketIoMiddleware = {
    (client: Socket, next: (err?: Error) => void): void;
};

/**
 * @function SocketAuthMiddleware
 * @description Middleware to validate WebSocket authentication tokens.
 * @returns {SocketIoMiddleware} - The middleware function.
 */

/**Socket auth middleware */
export const SocketAuthMiddleware = (): SocketIoMiddleware => {
    return (client, next) => {
        try {
            WebSocketGuardGuard.validateToken(client);
        } catch (error) {
            next(error);
        }
    };
};
