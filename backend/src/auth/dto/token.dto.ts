import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Provider } from 'src/common/const/provider.enum';

export class TokenDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'username' })
  username: string;

  @IsString()
  @ApiProperty({ example: null, required: false })
  password?: string;

  @IsString()
  @ApiProperty({ example: null, required: false })
  nickname?: string;

  @IsEnum(Provider)
  @ApiProperty({ example: null, required: false })
  provider?: Provider;

  @IsString()
  @ApiProperty({ example: null, required: false })
  image?: string;
}
