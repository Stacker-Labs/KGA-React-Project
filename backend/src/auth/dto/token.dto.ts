import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';
import { Provider } from 'src/common/const/provider.enum';

export class TokenDto {
  @IsNotEmpty()
  @ApiProperty({ example: 'username' })
  username: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'nickname' })
  nickname: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'local' })
  provider: Provider;

  @ApiProperty({ example: null })
  image?: string;
}
