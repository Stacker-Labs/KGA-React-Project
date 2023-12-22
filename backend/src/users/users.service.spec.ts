import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { usersProviders } from '../common/mock/provider/user.provider';
import { MockUserRepository } from '../common/mock/repository/user.repository';
import { ResGetLoginUserDto } from './dto/res-getLoginUser.dto';
import { BadRequestException } from '@nestjs/common';

describe('UsersService', () => {
  let service: UsersService;
  const mockUser = new MockUserRepository();
  const [user, otherUser] = mockUser.userModels;
  const notExistUser = mockUser.notExistUser;
  const FUNCTION = 'function';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: usersProviders,
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  // GETLOGINUSER: - make, return, error
  describe('Get Login user', () => {
    const username = user.username;

    it('Make | getLoginUser', () => {
      expect(typeof service.getLoginUser).toBe(FUNCTION);
    });

    it('Return | {accessToken: string, user: UserModel}', async () => {
      const result = await service.getLoginUser(user.username);
      const keys = Object.keys(result);
      const required = ['accessToken', 'user'];
      expect(keys).toEqual(expect.arrayContaining(required));
    });

    it('Error | user does not exist', async () => {
      const result = await service.getLoginUser(notExistUser.username);
      expect(result).rejects.toThrow(BadRequestException);
    });
  });

  // GETUSER: - makex, returnx, errorx
  describe('Get User', () => {
    it.todo('Make | getUser');

    it.todo('Return | {user: UserModel}');

    it.todo('Error | user does not exist');
  });

  // EDITUSER: - makex, returnx, errorx
  describe('Edit User', () => {
    it.todo('Make | editUser');

    it.todo('Return | ');

    it.todo('Error | user does not exist');
  });

  // DELETEUSER: - makex, returnx, errorx
  describe('Delete User', () => {
    it.todo('Make | deleteUser');

    it.todo('Return | ');

    it.todo('Error | user does not exist');
  });

  // GETUSERBOARDS: - makex, returnx, errorx
  describe('Get User Boards', () => {
    it.todo('Make | getUserBoards');

    it.todo('Return | ');

    it.todo('Error | user does not exist');
  });

  // CREATEFOLLOW: - makex, returnx, errorx
  describe('Create Follow', () => {
    it.todo('Make | createFollow');

    it.todo('Return | ');

    it.todo('Error | user does not exist');
  });

  // DELETEFOLLOW: - makex, returnx, errorx
  describe('Delete Follow', () => {
    it.todo('Make | deleteFollow');

    it.todo('Return | ');

    it.todo('Error | user does not exist');
  });
});
