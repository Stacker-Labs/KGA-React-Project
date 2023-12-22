export class MockRoomRepository {
  static roomModels = [{ id: 1, chats: [], users: [], createdAt: new Date() }];

  save() {}

  findOne() {
    return MockRoomRepository.roomModels[0];
  }

  delete() {}
}
