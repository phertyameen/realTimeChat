import { Module,forwardRef } from '@nestjs/common';
import { PaginationProvider } from './pagination/Provider/pagination.provider';




@Module({
  imports:[],
  providers: [PaginationProvider],
  controllers: [],
  exports:[PaginationProvider]
})
export class PaginationModule {}
