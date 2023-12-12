import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Provider } from 'src/common/const/provider.enum';

export class TokenDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'username' })
  username: string;

  @IsString()
  @ApiProperty({ example: null })
  password?: string;

  @IsString()
  @ApiProperty({ example: null })
  nickname?: string;

  @IsEnum(Provider)
  @ApiProperty({ example: null })
  provider?: Provider;

  @IsString()
  @ApiProperty({ example: null })
  image?: string;
}
