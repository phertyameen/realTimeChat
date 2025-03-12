import { ApiProperty } from '@nestjs/swagger';

/**
 * Generic class for paginated responses.
 * @template T - The type of data being paginated.
 */
export class Paginated<T> {
  /** The list of data items. */
  @ApiProperty({ isArray: true })
  data: T[];

  /**
   * Metadata related to pagination.
   */
  @ApiProperty({
    type: 'object',
    properties: {
      itemsPerPage: { type: 'number', description: 'Number of items per page' },
      totalItems: { type: 'number', description: 'Total number of items' },
      currentPage: { type: 'number', description: 'Current page number' },
      totalPage: { type: 'number', description: 'Total number of pages' },
    },
  })
  meta: {
    itemsPerPage: number;
    totalItems: number;
    currentPage: number;
    totalPage: number;
  };

  /**
   * Links for navigation through paginated results.
   */
  @ApiProperty({
    type: 'object',
    properties: {
      first: { type: 'string', description: 'URL of the first page' },
      last: { type: 'string', description: 'URL of the last page' },
      current: { type: 'string', description: 'URL of the current page' },
      previous: { type: 'string', description: 'URL of the previous page' },
      next: { type: 'string', description: 'URL of the next page' },
    },
  })
  link: {
    first: string;
    last: string;
    current: string;
    previous: string;
    next: string;
  };
}
