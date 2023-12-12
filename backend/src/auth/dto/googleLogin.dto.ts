import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class GoogleLoginDto {
  @IsNotEmpty()
  @ApiProperty({
    example: 'google access token',
  })
  code: string;
}
