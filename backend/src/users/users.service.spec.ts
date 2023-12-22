import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { usersProviders } from '../common/mock/provider/user.provider';
import { MockUserRepository } from '../common/mock/repository/user.repository';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { ReqEditUserDto } from './dto/req-editUser.dto';

describe('UsersService', () => {
  let service: UsersService;
  const mockUser = MockUserRepository;
  const [user, otherUser] = mockUser.userModels;
  const notExistUser = mockUser.notExistUser;
  const influencer = mockUser.influencer;
  const FUNCTION = 'function';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: usersProviders,
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  // GETLOGINUSER: - make, return, error
  describe('Get Login user', () => {
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
      const result = service.getLoginUser(notExistUser.username);
      await expect(result).rejects.toThrow(BadRequestException);
    });
  });

  // GETUSER: - make, return, error
  describe('Get User', () => {
    it('Make | getUser', () => {
      expect(typeof service.getUser).toEqual(FUNCTION);
    });

    it('Return | {user: UserModel}', async () => {
      const result = await service.getUser(user.id);
      const keys = Object.keys(result);
      const required = ['user'];
      expect(keys).toEqual(expect.arrayContaining(required));
    });

    it('Error | user does not exist', async () => {
      const result = service.getUser(notExistUser.id);
      await expect(result).rejects.toThrow(BadRequestException);
    });
  });

  // EDITUSER: - make, return, error
  describe('Edit User', () => {
    const reqEditUserDto: ReqEditUserDto = {
      nickname: 'newNickname',
      password: 'newPassword',
      image: 'newImageLink',
    };

    it('Make | editUser', () => {
      expect(typeof service.editUser).toEqual(FUNCTION);
    });

    it('Return | {editedUser: UserModel}', async () => {
      const result = await service.editUser(
        user.id,
        reqEditUserDto,
        user.username,
      );
      const keys = Object.keys(result);
      const required = ['editedUser'];
      expect(keys).toEqual(expect.arrayContaining(required));
    });

    it('Error | user does not exist', async () => {
      const idResult = service.editUser(
        notExistUser.id,
        reqEditUserDto,
        user.username,
      );
      await expect(idResult).rejects.toThrow(BadRequestException);

      const usernameResult = service.editUser(
        user.id,
        reqEditUserDto,
        notExistUser.username,
      );
      await expect(usernameResult).rejects.toThrow(BadRequestException);
    });

    it('Error | user does not have permission', async () => {
      const adminResult = service.editUser(
        otherUser.id,
        reqEditUserDto,
        user.username,
      );
      await expect(adminResult).resolves.not.toThrow();

      const result = service.editUser(
        user.id,
        reqEditUserDto,
        otherUser.username,
      );
      await expect(result).rejects.toThrow(UnauthorizedException);
    });
  });

  // DELETEUSER: - make, return, error
  describe('Delete User', () => {
    it('Make | deleteUser', () => {
      expect(typeof service.deleteUser).toEqual(FUNCTION);
    });

    it('Return | {message: string}', async () => {
      const result = await service.deleteUser(user.id, user.username);
      const keys = Object.keys(result);
      const required = ['message'];
      console.log(keys, required);
      expect(keys).toEqual(expect.arrayContaining(required));
    });

    it('Error | user does not exist', async () => {
      const idResult = service.deleteUser(notExistUser.id, user.username);
      await expect(idResult).rejects.toThrow(BadRequestException);

      const usernameResult = service.deleteUser(user.id, notExistUser.username);
      await expect(usernameResult).rejects.toThrow(BadRequestException);
    });

    it('Error | user does not have permission', async () => {
      const adminResult = service.deleteUser(otherUser.id, user.username);
      await expect(adminResult).resolves.not.toThrow();

      const result = service.deleteUser(user.id, otherUser.username);
      await expect(result).rejects.toThrow(UnauthorizedException);
    });
  });

  // GETUSERBOARDS: - make, return
  describe('Get User Boards', () => {
    it('Make | getUserBoards', () => {
      expect(typeof service.getUserBoards).toEqual(FUNCTION);
    });

    it('Return | {boards: BoardModel[], boardLength: number, nextPage: number | boolean}', async () => {
      const result = await service.getUserBoards(user.id, 1);
      const keys = Object.keys(result);
      const required = ['boards', 'boardLength', 'nextPage'];
      expect(keys).toEqual(expect.arrayContaining(required));
    });
  });

  // CREATEFOLLOW: - make, return, error
  describe('Create Follow', () => {
    it('Make | createFollow', () => {
      expect(typeof service.createFollow).toEqual(FUNCTION);
    });

    it('Return | {message: string}', async () => {
      const result = await service.createFollow(otherUser.id, user.username);
      const keys = Object.keys(result);
      const required = ['message'];
      expect(keys).toEqual(expect.arrayContaining(required));
    });

    it('Error | user cannot follow himself', async () => {
      const result = service.createFollow(user.id, user.username);
      await expect(result).rejects.toThrow(BadRequestException);
    });

    it('Error | user follow already following user', async () => {
      const result = service.createFollow(influencer.id, user.username);
      await expect(result).rejects.toThrow(BadRequestException);
    });

    it('Error | user does not exist', async () => {
      const result = service.createFollow(notExistUser.id, user.username);
      await expect(result).rejects.toThrow(BadRequestException);
    });
  });

  // DELETEFOLLOW: - makex, returnx, errorx
  describe('Delete Follow', () => {
    it.todo('Make | deleteFollow');

    it.todo('Return | ');

    it.todo('Error | user does not exist');
  });
});
