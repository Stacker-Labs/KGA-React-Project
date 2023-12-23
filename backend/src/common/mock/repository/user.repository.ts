import { Provider } from '../../../common/const/provider.enum';
import { Role } from '../../../common/const/role.enum';
import { UserModel } from '../../../users/entities/user.entity';
import { MockRoomRepository } from './room.repository';

export class MockUserRepository {
  static notExistUser = {
    id: 0,
    username: 'notExistUser',
  };

  static influencer = {
    id: 3,
    username: 'influencer',
    nickname: 'influencer',
    password: 'p@ssw0rd',
    role: Role.USER,
    provider: Provider.LOCAL,
    followingUsers: [],
    followerUsers: [],
    comments: [],
    rooms: [MockRoomRepository.roomModels[0]],
    chats: [],
    boards: [],
    likes: [],
    views: [],
    createdAt: new Date(),
    image: null,
    bio: '',
  };

  static userModels: UserModel[] = [
    {
      id: 1,
      username: 'username',
      nickname: 'nickname',
      password: 'p@ssw0rd',
      role: Role.ADMIN,
      provider: Provider.LOCAL,
      followingUsers: [MockUserRepository.influencer],
      followerUsers: [],
      comments: [],
      rooms: [MockRoomRepository.roomModels[0]],
      chats: [],
      boards: [],
      likes: [],
      views: [],
      createdAt: new Date(),
      image: null,
      bio: '',
    },
    {
      id: 2,
      username: 'otherUser',
      nickname: 'otherUser',
      password: 'p@ssw0rd',
      role: Role.USER,
      provider: Provider.LOCAL,
      followingUsers: [],
      followerUsers: [],
      comments: [],
      rooms: [],
      chats: [],
      boards: [],
      likes: [],
      views: [],
      createdAt: new Date(),
      image: null,
      bio: '',
    },
    this.influencer,
  ];

  static accessToken =
    'eyasidfjhaiowejf.wejafiowjfiowefwae.aweoifwjaeiwoa - this token is not working';

  findOne({ where: { username, id } }) {
    const findUser = !id
      ? MockUserRepository.userModels.find((user) => user.username === username)
      : MockUserRepository.userModels.find((user) => user.id === id);

    if (!findUser) {
      return null;
    }

    return findUser;
  }

  save({ id, username, nickname, password, image, bio }) {
    const userIdx = MockUserRepository.userModels.findIndex(
      (user) => user.id === id,
    );
    if (userIdx === -1) {
      MockUserRepository.userModels.push({
        id,
        username,
        password,
        role: Role.USER,
        provider: Provider.LOCAL,
        nickname,
        followingUsers: [],
        followerUsers: [],
        comments: [],
        rooms: [],
        chats: [],
        boards: [],
        likes: [],
        views: [],
        createdAt: null,
        image,
        bio,
      });

      return MockUserRepository.userModels.slice(-1)[0];
    }
    if (nickname) {
      MockUserRepository.userModels[userIdx].nickname = nickname;
    }
    if (password) {
      MockUserRepository.userModels[userIdx].password = password;
    }
    if (image) {
      MockUserRepository.userModels[userIdx].image = image;
    }

    return MockUserRepository.userModels[userIdx];
  }

  delete(id: number) {}
}
