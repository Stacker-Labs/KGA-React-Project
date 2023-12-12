import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class KakaoLoginDto {
  @IsNotEmpty()
  @ApiProperty({
    example: 'kakao code string',
  })
  code: string;
}
