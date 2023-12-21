import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { UsersController } from './users.controller';
import { usersProviders } from '../common/mock/provider/user.provider';

describe('UsersController', () => {
  let controller: UsersController;
  const user = { id: 1, username: 'username' };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: usersProviders,
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  describe('Get Login User', () => {
    it('Make getLoginUser', () => {
      expect(typeof controller.getLoginUser).toBe('function');
    });

    it('Run getLoginUser with username: string', () => {
      const username: string = 'username';
      const getLoginUser = jest.fn();
      controller.getLoginUser = getLoginUser;
      controller.getLoginUser(username);
      expect(controller.getLoginUser).toHaveBeenCalledWith(username);
    });

    it('Return value is accessToken and user', async () => {
      const result = await controller.getLoginUser(user.username);
      const keys = Object.keys(result);
      const required = ['accessToken', 'user'];

      expect(keys).toEqual(expect.arrayContaining(required));
    });

    it('Throw error if not exist user', async () => {
      const notExistUsername: string = 'notExistUser';
      const getLoginUser = controller.getLoginUser(notExistUsername);

      await expect(getLoginUser).rejects.toThrow(BadRequestException);
    });
  });

  describe('Get User', () => {
    it('Make getUser', () => {
      expect(typeof controller.getUser).toBe('function');
    });

    it('Run getUser with id: number', () => {
      const id: number = 1;
      const getUser = jest.fn();
      controller.getUser = getUser;
      controller.getUser(id);

      expect(controller.getUser).toHaveBeenCalledWith(id);
    });

    it('Return value is user info', async () => {
      const result = await controller.getUser(user.id);
      const keys = Object.keys(result);
      const required = [
        'id',
        'comments',
        'followingUsers',
        'followerUsers',
        'rooms',
      ];

      expect(keys).toEqual(expect.arrayContaining(required));
    });

    it('Throw error if not exist user', async () => {
      const notExistUserId: number = 0;
      const getUser = controller.getUser(notExistUserId);

      await expect(getUser).rejects.toThrow(BadRequestException);
    });
  });
});
