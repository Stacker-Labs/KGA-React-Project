export class MockUserRepository {
  #userModel = [
    {
      id: 1,
      username: 'username',
      nickname: 'nickname',
      image: null,
      password: 'p@ssw0rd',
      followingUsers: [],
      followerUsers: [],
      comments: [],
      rooms: [],
    },
    {
      id: 2,
      username: 'otherUser',
      nickname: 'otherUser',
      image: null,
      password: 'p@ssw0rd',
      followingUsers: [],
      followerUsers: [],
      comments: [],
      rooms: [],
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

  save({ id, username, nickname, password, image }) {
    const userIdx = this.#userModel.findIndex((user) => user.id === id);
    if (userIdx === -1) {
      this.#userModel.push({
        id,
        username,
        password,
        nickname,
        image,
        followingUsers: [],
        followerUsers: [],
        comments: [],
        rooms: [],
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
