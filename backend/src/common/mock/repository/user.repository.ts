export class MockUserRepository {
  #userModel = [{ id: 1, username: 'username' }];

  findOne({ where: { username, id } }) {
    const findUser = username
      ? this.#userModel.find((user) => user.username === username)
      : this.#userModel.find((user) => user.id === id);
    if (!findUser) {
      return null;
    }

    return findUser;
  }
}
