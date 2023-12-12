import { ApiProperty } from '@nestjs/swagger';

export class KakaoLoginDto {
  @ApiProperty({
    example: 'kakao code string',
  })
  code: string;
}
