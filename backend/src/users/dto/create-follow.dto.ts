import { ApiProperty } from '@nestjs/swagger';

export class CreateFollowDto {
  @ApiProperty({ example: 1 })
  id: number;
}
