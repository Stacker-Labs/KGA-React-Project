import { BoardModel } from '../../../boards/entities/board.entity';
import { MockUserRepository } from './user.repository';

export class MockBoardRepository {
  static boardModels: BoardModel[] = [
    {
      comments: [],
      title: 'title',
      content: 'content',
      likes: [],
      views: [],
      tags: [],
      user: MockUserRepository.userModels[0],
      id: 1,
      createdAt: new Date(),
    },
    {
      comments: [],
      title: 'title',
      content: 'content',
      likes: [],
      views: [],
      tags: [],
      user: MockUserRepository.userModels[0],
      id: 2,
      createdAt: new Date(),
    },
  ];
  static notExistBoard = {
    id: 0,
  };

  findAndCount(where: { user: { id: number } }) {
    return [MockBoardRepository.boardModels, 2];
  }
}
