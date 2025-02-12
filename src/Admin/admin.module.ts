import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminService } from './provider/admin.service';
import { AdminController } from './admin.controller';
import { Admin } from './admin.enitity';


@Module({    
  imports: [TypeOrmModule.forFeature([Admin])],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [],
})
export class AdminModule {}
