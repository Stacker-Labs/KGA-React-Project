export class MockUserRepository {
  #userModel = [
    {
      id: 1,
      username: 'username',
      followingUsers: [],
      followerUsers: [],
      comments: [],
      rooms: [],
    },
  ];

  findOne({ where: { username, id } }) {
    console.log(username);
    const findUser = username
      ? this.#userModel.find((user) => user.username === username)
      : this.#userModel.find((user) => user.id === id);

    if (!findUser) {
      return null;
    }

    return findUser;
  }
}
