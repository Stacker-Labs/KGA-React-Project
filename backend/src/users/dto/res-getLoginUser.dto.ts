import { IsInstance, IsNotEmpty, IsString } from 'class-validator';
import { UserModel } from '../entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../common/const/role.enum';
import { Provider } from '../../common/const/provider.enum';

export class ResGetLoginUserDto {
  @ApiProperty({
    example:
      'eyasidfjhaiowejf.wejafiowjfiowefwae.aweoifwjaeiwoa - this token is not working ',
  })
  @IsString()
  @IsNotEmpty()
  accessToken: string;

  @ApiProperty({
    example: {
      id: 1,
      username: 'username',
      nickname: 'nickname',
      image: null,
      bio: '',
      role: Role.ADMIN,
      provider: Provider.LOCAL,
      followingUsers: [],
      followerUsers: [],
      comments: [],
      rooms: [],
      createdAt: new Date(),
    },
  })
  @IsInstance(UserModel)
  @IsNotEmpty()
  user: UserModel;
}
