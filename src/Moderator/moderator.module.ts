import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModeratorController } from './moderator.controller';
import { ModeratorService } from './provider/moderator.service';
import { Moderator } from './moderator.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Moderator])],
  controllers: [ModeratorController],
  providers: [ModeratorService],
  exports: [],
})
export class ModeratorModule {}
