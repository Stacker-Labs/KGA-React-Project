import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { UsersController } from './users.controller';
import { usersProviders } from '../common/mock/provider/user.provider';

describe('UsersController', () => {
  let controller: UsersController;

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

    it('Run getLoginUser with username', () => {
      const username: string = 'username';
      const getLoginUser = jest.fn();

      controller.getLoginUser = getLoginUser;
      controller.getLoginUser(username);

      expect(getLoginUser).toHaveBeenCalledWith(username);
    });

    it('Return value is accessToken and user', async () => {
      const result = await controller.getLoginUser('username');
      const keys = Object.keys(result).sort();

      expect(keys).toEqual(['accessToken', 'user']);
    });

    it('Throw error if not exist username', async () => {
      const getLoginUser = controller.getLoginUser('notExistUser');

      await expect(getLoginUser).rejects.toThrow(BadRequestException);
    });
  });
});
