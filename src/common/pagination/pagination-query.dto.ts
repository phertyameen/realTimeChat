import { IsOptional, IsPositive } from 'class-validator';

/**pagination dto class */
export class PaginationQueryDto {

  /**limit and optional property of type number */
  @IsOptional()
  @IsPositive()
  limit?: number = 10;

  /**page and optional property of type number */
  @IsOptional()
  @IsPositive()
  page?: number = 1;
}
