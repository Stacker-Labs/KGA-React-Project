import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { UsersController } from './users.controller';
import { usersProviders } from '../common/mock/provider/user.provider';
import { EditUserDto } from './dto/edit-user.dto';

describe('UsersController', () => {
  let controller: UsersController;
  const user = { id: 1, username: 'username' };
  const notExistUser = { id: 0, username: 'notExistUser' };
  const otherUser = { id: 2, username: 'otherUser' };
  const FUNCTION = 'function';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: usersProviders,
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  // GETLOGINUSER: - make, run, return, error
  describe('Get Login User', () => {
    const username: string = user.username;

    it('Make | getLoginUser', () => {
      expect(typeof controller.getLoginUser).toBe('function');
    });

    it('Run | getLoginUser(username: string)', () => {
      const getLoginUser = jest.fn();
      controller.getLoginUser = getLoginUser;
      controller.getLoginUser(username);
      expect(controller.getLoginUser).toHaveBeenCalledWith(username);
    });

    it('Return | {accessToken: string, user: UserModel}', async () => {
      const result = await controller.getLoginUser(username);
      const keys = Object.keys(result);
      const required = ['accessToken', 'user'];

      expect(keys).toEqual(expect.arrayContaining(required));
    });

    it('Error | user does not exist', async () => {
      const getLoginUser = controller.getLoginUser(notExistUser.username);

      await expect(getLoginUser).rejects.toThrow(BadRequestException);
    });
  });

  // GETUSER: - make, run, return, error
  describe('Get User', () => {
    const id: number = user.id;

    it('Make | getUser', () => {
      expect(typeof controller.getUser).toBe(FUNCTION);
    });

    it('Run | getUser(id: number)', () => {
      const getUser = jest.fn();
      controller.getUser = getUser;
      controller.getUser(id);

      expect(controller.getUser).toHaveBeenCalledWith(id);
    });

    it('Return | user: UserModel', async () => {
      const result = await controller.getUser(id);
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

    it('Error | user does not exist', async () => {
      const getUser = controller.getUser(notExistUser.id);

      await expect(getUser).rejects.toThrow(BadRequestException);
    });
  });

  // EDITUSER: - make, run, return, error
  describe('Edit User', () => {
    const id: number = user.id;
    const editUserDto: EditUserDto = {
      nickname: 'newNickname',
      password: 'newPassword',
      image: 'newImageLink',
    };
    const username: string = user.username;

    it('Make | editUser', () => {
      expect(typeof controller.editUser).toBe(FUNCTION);
    });

    it('Run | editUser(id: number, editUserDto: EditUserDto, username: string)', () => {
      const editUser = jest.fn();
      controller.editUser = editUser;
      controller.editUser(id, editUserDto, username);

      expect(controller.editUser).toHaveBeenCalledWith(
        id,
        editUserDto,
        username,
      );
    });

    it('Return | editedUser: UserModel', async () => {
      const result = await controller.editUser(id, editUserDto, username);
      const keys = Object.keys(result);
      const required = ['nickname', 'password', 'image'];

      expect(keys).toEqual(expect.arrayContaining(required));
    });

    it('Error | user does not exist', async () => {
      const result = controller.editUser(
        notExistUser.id,
        editUserDto,
        username,
      );
      await expect(result).rejects.toThrow(BadRequestException);
    });

    it('Error | user does not have permission', async () => {
      const result = controller.editUser(
        user.id,
        editUserDto,
        otherUser.username,
      );
      await expect(result).rejects.toThrow(UnauthorizedException);
    });
  });

  // DELETEUSER: - make, run, error
  describe('Delete User', () => {
    const id: number = user.id;
    const username: string = user.username;

    it('Make | deleteUser', () => {
      expect(typeof controller.deleteUser).toBe(FUNCTION);
    });

    it('Run | deleteUser(id: number, username: string)', () => {
      const deleteUser = jest.fn();
      controller.deleteUser = deleteUser;
      controller.deleteUser(id, username);

      expect(controller.deleteUser).toHaveBeenCalledWith(id, username);
    });

    it('Error | user does not have permission', async () => {
      const result = controller.deleteUser(id, username);
      await expect(result).rejects.toThrow(UnauthorizedException);
    });
  });

  // GETUSERBOARDS: - make, run, return
  describe('Get User Boards', () => {
    const id: number = user.id;
    const page: number = 1;

    it.todo('Make | getUserBoards');

    it.todo('Run | getUserBoards(id: number, page: number)');

    it.todo(
      'Return | {boards: BoardModel[], boardLength: number, nextPage: number | boolean}',
    );
  });

  // CREATEFOLLOW: - make, run, return, error
  describe('Create Follow', () => {
    const id: number = otherUser.id;
    const username: string = user.username;

    it.todo('Make | createFollow');

    it.todo('Run | createFollow(id: number, username: string)');

    it.todo('Return | user: UserModel');

    it.todo('Error | user follow himself');

    it.todo('Error | user does not exist');

    it.todo('Error | user follow already following user');
  });

  // DELETEFOLLOW: - make, run, error
  describe('Delete Follow', () => {
    const id: number = otherUser.id;
    const username: string = user.username;

    it.todo('Make | deleteFollow');

    it.todo('Run | deleteFollow(id: number, username: string)');

    it.todo('Error | user does not exist');

    it.todo('Error | user unfollow already unfollowing user');
  });
});
