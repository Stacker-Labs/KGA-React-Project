import { IsInstance, IsNotEmpty } from 'class-validator';
import { UserModel } from '../entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../common/const/role.enum';
import { Provider } from '../../common/const/provider.enum';

export class ResEditUserDto {
  @ApiProperty({
    example: {
      id: 1,
      username: 'username',
      nickname: 'nickname',
      password: 'p@ssw0rd',
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
  editedUser: UserModel;
}
