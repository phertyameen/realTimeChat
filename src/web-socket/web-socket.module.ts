import { Module } from '@nestjs/common';
import { WebSocketGateway } from '@nestjs/websockets';
import { WebsocketGateway } from './websocketEvents/websocket.gateway';


@Module({
    imports:[],
    controllers:[],
    providers:[WebsocketGateway],
    exports:[WebsocketGateway]
})
export class WebSocketModule {}
