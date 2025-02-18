// import { Controller, Post, Get, Delete, Body, Param } from '@nestjs/common';
// import { ChatRoomsService } from './providers/chatrooms/chatrooms.service';

// @Controller('chatroom')
// export class ChatRoomsController {
//   constructor(private readonly chatRoomService: ChatRoomsService) {}

//   @Post()
//   create(@Body() { name, userIds, type }) {
//     return this.chatRoomService.create(name, userIds, type);
//   }

//   @Get(':userId')
//   findAll(@Param('userId') userId: string) {
//     return this.chatRoomService.findAll(userId);
//   }

//   @Delete(':id')
//   delete(@Param('id') id: string) {
//     return this.chatRoomService.delete(id);
//   }
// }