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
    it('Return value is accessToken and user', async () => {
      const result = await controller.getLoginUser('username');
      const keys = Object.keys(result).sort();
      expect(keys).toEqual(['accessToken', 'user']);
    });
    it('Throw error if not exist username', async () => {
      const getLoginUser = controller.getLoginUser('username00');
      await expect(getLoginUser).rejects.toThrow(BadRequestException);
    });
  });
});
