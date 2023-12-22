import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResDeleteUserDto {
  @ApiProperty({
    example: 'User has been deleted.',
  })
  @IsString()
  @IsNotEmpty()
  message: string;
}
