import { Module } from '@nestjs/common';
import { MessageModule } from 'src/messages/messages.module';
import { WebsocketGateway } from './websocketEvents/websocket.gateway';

/**web socket module */
@Module({
    imports: [MessageModule],
    providers:[WebsocketGateway],
    exports: [WebsocketGateway],
})

/**websocket class */
export class WebSocketModule {}
