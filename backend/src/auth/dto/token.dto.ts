import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Provider } from 'src/common/const/provider.enum';

export class TokenDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'username' })
  username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'nickname' })
  nickname: string;

  @IsEnum(Provider)
  @IsNotEmpty()
  @ApiProperty({ example: 'local' })
  provider: Provider;

  @IsString()
  @ApiProperty({ example: null })
  image?: string;
}
