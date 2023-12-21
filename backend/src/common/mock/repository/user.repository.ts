import { Provider } from '../../../common/const/provider.enum';
import { Role } from '../../../common/const/role.enum';
import { UserModel } from '../../../users/entities/user.entity';

export class MockUserRepository {
  #userModel: UserModel[] = [
    {
      id: 1,
      username: 'username',
      nickname: 'nickname',
      password: 'p@ssw0rd',
      role: Role.ADMIN,
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
  ];

  findOne({ where: { username, id } }) {
    const findUser = username
      ? this.#userModel.find((user) => user.username === username)
      : this.#userModel.find((user) => user.id === id);

    if (!findUser) {
      return null;
    }

    return findUser;
  }

  save({ id, username, nickname, password, image, bio }) {
    const userIdx = this.#userModel.findIndex((user) => user.id === id);
    if (userIdx === -1) {
      this.#userModel.push({
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

      return this.#userModel.slice(-1)[0];
    }
    if (nickname) {
      this.#userModel[userIdx].nickname = nickname;
    }
    if (password) {
      this.#userModel[userIdx].password = password;
    }
    if (image) {
      this.#userModel[userIdx].image = image;
    }

    return this.#userModel[userIdx];
  }
}
