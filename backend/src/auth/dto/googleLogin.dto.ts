import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GoogleLoginDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'google access token',
  })
  code: string;
}
