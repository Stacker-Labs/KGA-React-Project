import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { usersProviders } from '../common/mock/provider/user.provider';
import { MockUserRepository } from '../common/mock/repository/user.repository';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { ReqEditUserDto } from './dto/req-editUser.dto';

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

  // DELETEUSER: - makex, returnx, errorx
  describe('Delete User', () => {
    it('Make | deleteUser', () => {});

    it('Return | ', async () => {});

    it('Error | user does not exist', async () => {});

    it('Error | user does not have permission', async () => {});
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
