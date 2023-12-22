import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResDeleteUserDto {
  @ApiProperty({
    example: '탈퇴가 완료되었습니다.',
  })
  @IsString()
  @IsNotEmpty()
  message: string;
}
