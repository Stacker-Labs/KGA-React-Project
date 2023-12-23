import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { usersProviders } from '../common/mock/provider/user.provider';
import { MockUserRepository } from '../common/mock/repository/user.repository';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { ReqEditUserDto } from './dto/req-editUser.dto';
import { JwtService } from '@nestjs/jwt';
import { ResGetLoginUserDto } from './dto/res-getLoginUser.dto';
import { ResGetUserDto } from './dto/res-getUser.dto';
import { ResEditUserDto } from './dto/res-editUser.dto';
import { ResDeleteFollowDto } from './dto/res-deleteFollowUser.dto';
import { ResGetUserBoardsDto } from './dto/res-getUserBoards.dto';
import { ResCreateFollowDto } from './dto/res-createFollow.dto';

describe('UsersService', () => {
  let usersService: UsersService;
  let jwtService: JwtService;
  const [user, otherUser] = MockUserRepository.userModels;
  const notExistUser = MockUserRepository.notExistUser;
  const influencer = MockUserRepository.influencer;
  const accessToken = MockUserRepository.accessToken;
  const FUNCTION = 'function';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: usersProviders,
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  // GETCOOKIEUSER: - make, return, error
  it('Make | getCookieUser', () => {
    expect(typeof usersService.getCookieUser).toEqual(FUNCTION);
  });

  it('Return | user: UserModel', async () => {
    const result = await usersService.getCookieUser(user.username);
    expect(result).toStrictEqual(user);
  });

  it('Error | user does not exist', async () => {
    const result = usersService.getCookieUser(notExistUser.username);
    await expect(result).rejects.toThrow(BadRequestException);
  });

  // VERIFIEDUSER: - make, return, error
  it('Make | verifiedUser', () => {
    expect(typeof usersService.verifiedUser).toEqual(FUNCTION);
  });

  it('Return | accessToken: string', () => {
    const accessToken = jwtService.sign(
      { username: user.username },
      { secret: 'secret' },
    );
    const result = jwtService.verify(accessToken, { secret: 'secret' });
    expect(result.username).toStrictEqual(user.username);
  });

  it('Error | user does not exist', async () => {
    const result = usersService.verifiedUser(notExistUser.id);
    await expect(result).rejects.toThrow(BadRequestException);
  });

  // GETLOGINUSER: - make, use, return
  describe('Get Login user', () => {
    const resGetLoginUserDto: ResGetLoginUserDto = { accessToken, user };

    it('Make | getLoginUser', () => {
      expect(typeof usersService.getLoginUser).toBe(FUNCTION);
    });

    it('Use | getCookieUser', async () => {
      jest.spyOn(usersService, 'getCookieUser');
      await usersService.getLoginUser(user.username);
      expect(usersService.getCookieUser).toHaveBeenCalled();
    });

    it('Use | jwtService.sign', async () => {
      jest.spyOn(jwtService, 'sign');
      await usersService.getLoginUser(user.username);
      expect(jwtService.sign).toHaveBeenCalled();
    });

    it('Return | {accessToken: string, user: UserModel}', async () => {
      const result = await usersService.getLoginUser(user.username);
      const keys = Object.keys(result);
      const required = Object.keys(resGetLoginUserDto);
      expect(keys).toEqual(expect.arrayContaining(required));
    });
  });

  // GETUSER: - make, use, return, error
  describe('Get User', () => {
    const resGetUserDto: ResGetUserDto = { user };
    it('Make | getUser', () => {
      expect(typeof usersService.getUser).toEqual(FUNCTION);
    });

    it('Use | verifiedUser', async () => {
      jest.spyOn(usersService, 'verifiedUser');
      await usersService.getUser(user.id);
      expect(usersService.verifiedUser).toHaveBeenCalled();
    });

    it('Return | {user: UserModel}', async () => {
      const result = await usersService.getUser(user.id);
      const keys = Object.keys(result);
      const required = Object.keys(resGetUserDto);
      expect(keys).toEqual(expect.arrayContaining(required));
    });
  });

  // EDITUSER: - make, use, return, error
  describe('Edit User', () => {
    const reqEditUserDto: ReqEditUserDto = {
      nickname: 'newNickname',
      password: 'newPassword',
      image: 'newImageLink',
    };
    const resEditUserDto: ResEditUserDto = { editedUser: user };

    it('Make | editUser', () => {
      expect(typeof usersService.editUser).toEqual(FUNCTION);
    });

    it('Use | verifiedUser', async () => {
      jest.spyOn(usersService, 'verifiedUser');
      await usersService.editUser(user.id, reqEditUserDto, user.username);
      expect(usersService.verifiedUser).toHaveBeenCalled();
    });

    it('Use | getCookieUser', async () => {
      jest.spyOn(usersService, 'getCookieUser');
      await usersService.editUser(user.id, reqEditUserDto, user.username);
      expect(usersService.getCookieUser).toHaveBeenCalled();
    });

    it('Return | {editedUser: UserModel}', async () => {
      const result = await usersService.editUser(
        user.id,
        reqEditUserDto,
        user.username,
      );
      const keys = Object.keys(result);
      const required = Object.keys(resEditUserDto);
      expect(keys).toEqual(expect.arrayContaining(required));
    });

    it('Error | user does not have permission', async () => {
      const adminResult = usersService.editUser(
        otherUser.id,
        reqEditUserDto,
        user.username,
      );
      await expect(adminResult).resolves.not.toThrow();

      const result = usersService.editUser(
        user.id,
        reqEditUserDto,
        otherUser.username,
      );
      await expect(result).rejects.toThrow(UnauthorizedException);
    });
  });

  // DELETEUSER: - make, return, error
  describe('Delete User', () => {
    const resDeleteFollowDto: ResDeleteFollowDto = { message: '' };
    it('Make | deleteUser', () => {
      expect(typeof usersService.deleteUser).toEqual(FUNCTION);
    });

    it('Use | verifiedUser', async () => {
      jest.spyOn(usersService, 'verifiedUser');
      await usersService.deleteUser(user.id, user.username);
      expect(usersService.verifiedUser).toHaveBeenCalled();
    });

    it('Use | getCookieUser', async () => {
      jest.spyOn(usersService, 'getCookieUser');
      await usersService.deleteUser(user.id, user.username);
      expect(usersService.getCookieUser).toHaveBeenCalled();
    });

    it('Return | {message: string}', async () => {
      const result = await usersService.deleteUser(user.id, user.username);
      const keys = Object.keys(result);
      const required = Object.keys(resDeleteFollowDto);
      expect(keys).toEqual(expect.arrayContaining(required));
    });

    it('Error | user does not have permission', async () => {
      const adminResult = usersService.deleteUser(otherUser.id, user.username);
      await expect(adminResult).resolves.not.toThrow();

      const result = usersService.deleteUser(user.id, otherUser.username);
      await expect(result).rejects.toThrow(UnauthorizedException);
    });
  });

  // GETUSERBOARDS: - make, return
  describe('Get User Boards', () => {
    const resGetUserBoardsDto: ResGetUserBoardsDto = {
      boardLength: 0,
      boards: [],
      nextPage: 0,
    };

    it('Make | getUserBoards', () => {
      expect(typeof usersService.getUserBoards).toEqual(FUNCTION);
    });

    it('Return | {boards: BoardModel[], boardLength: number, nextPage: number | boolean}', async () => {
      const result = await usersService.getUserBoards(user.id, 1);
      const keys = Object.keys(result);
      const required = Object.keys(resGetUserBoardsDto);
      expect(keys).toEqual(expect.arrayContaining(required));
    });
  });

  // CREATEFOLLOW: - make, return, error
  describe('Create Follow', () => {
    const resCreateFollowDto: ResCreateFollowDto = { message: '' };

    it('Make | createFollow', () => {
      expect(typeof usersService.createFollow).toEqual(FUNCTION);
    });

    it('Use | getCookieUser', async () => {
      jest.spyOn(usersService, 'getCookieUser');
      await usersService.createFollow(otherUser.id, user.username);
      expect(usersService.getCookieUser).toHaveBeenCalled();
    });

    it('Use | verifiedUser', async () => {
      jest.spyOn(usersService, 'verifiedUser');
      await usersService.createFollow(otherUser.id, user.username);
      expect(usersService.verifiedUser).toHaveBeenCalled();
    });

    it('Return | {message: string}', async () => {
      const result = await usersService.createFollow(
        otherUser.id,
        user.username,
      );
      const keys = Object.keys(result);
      const required = Object.keys(resCreateFollowDto);
      expect(keys).toEqual(expect.arrayContaining(required));
    });

    it('Error | user follow himself', async () => {
      const result = usersService.createFollow(user.id, user.username);
      await expect(result).rejects.toThrow(BadRequestException);
    });

    it('Error | user follow already following user', async () => {
      const result = usersService.createFollow(influencer.id, user.username);
      await expect(result).rejects.toThrow(BadRequestException);
    });

    it('Error | user does not exist', async () => {
      const result = usersService.createFollow(notExistUser.id, user.username);
      await expect(result).rejects.toThrow(BadRequestException);
    });
  });

  // DELETEFOLLOW: - make, return, error
  describe('Delete Follow', () => {
    const resDeleteFollowDto: ResDeleteFollowDto = { message: '' };

    it('Make | deleteFollow', () => {
      expect(typeof usersService.deleteFollow).toEqual(FUNCTION);
    });

    it('Use | getCookieUser', async () => {
      jest.spyOn(usersService, 'getCookieUser');
      await usersService.deleteFollow(influencer.id, user.username);
      expect(usersService.getCookieUser).toHaveBeenCalled();
    });

    it('Return | {message: string}', async () => {
      const result = await usersService.deleteFollow(
        influencer.id,
        user.username,
      );
      const keys = Object.keys(result);
      const required = Object.keys(resDeleteFollowDto);
      expect(keys).toEqual(expect.arrayContaining(required));
    });

    it('Error | user unfollow already unfollowing user', async () => {
      const result = usersService.deleteFollow(otherUser.id, user.username);
      await expect(result).rejects.toThrow(BadRequestException);
    });
  });
});
