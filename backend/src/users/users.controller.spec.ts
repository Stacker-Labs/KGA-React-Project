import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { usersProviders } from '../common/mock/provider/user.provider';
import { ReqEditUserDto } from './dto/req-editUser.dto';
import { ResGetLoginUserDto } from './dto/res-getLoginUser.dto';
import { ResGetUserDto } from './dto/res-getUser.dto';
import { ResEditUserDto } from './dto/res-editUser.dto';
import { MockUserRepository } from '../common/mock/repository/user.repository';
import { ResDeleteUserDto } from './dto/res-deleteUser.dto';
import { ResGetUserBoardsDto } from './dto/res-getUserBoards.dto';
import { ResCreateFollowDto } from './dto/res-createFollow.dto';

describe('UsersController', () => {
  let controller: UsersController;
  const [user, otherUser] = MockUserRepository.userModels;
  const influencer = MockUserRepository.influencer;
  const FUNCTION = 'function';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: usersProviders,
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  // GETLOGINUSER: - make, run, return
  describe('Get Login User', () => {
    const username: string = user.username;

    it('Make | getLoginUser', () => {
      expect(typeof controller.getLoginUser).toBe(FUNCTION);
    });

    it('Run | getLoginUser(username: string)', () => {
      const getLoginUser = jest.fn();
      controller.getLoginUser = getLoginUser;
      controller.getLoginUser(username);
      expect(controller.getLoginUser).toHaveBeenCalledWith(username);
    });

    it('Return | ResGetLoginUserDto', async () => {
      const result = await controller.getLoginUser(username);
      expect(result).toBeInstanceOf(ResGetLoginUserDto);
    });
  });

  // GETUSER: - make, run, return
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

    it('Return | ResGetUserDto', async () => {
      const result = await controller.getUser(id);
      expect(result).toBeInstanceOf(ResGetUserDto);
    });
  });

  // EDITUSER: - make, run, return
  describe('Edit User', () => {
    const id: number = user.id;
    const reqEditUserDto: ReqEditUserDto = {
      nickname: 'newNickname',
      password: 'newPassword',
      image: 'newImageLink',
    };
    const username: string = user.username;

    it('Make | editUser', () => {
      expect(typeof controller.editUser).toBe(FUNCTION);
    });

    it('Run | editUser(id: number, reqEditUserDto: ReqEditUserDto, username: string)', () => {
      const editUser = jest.fn();
      controller.editUser = editUser;
      controller.editUser(id, reqEditUserDto, username);
      expect(controller.editUser).toHaveBeenCalledWith(
        id,
        reqEditUserDto,
        username,
      );
    });

    it('Return | ResEditUserDto', async () => {
      const result = await controller.editUser(id, reqEditUserDto, username);
      expect(result).toBeInstanceOf(ResEditUserDto);
    });
  });

  // DELETEUSER: - make, run, return
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

    it('Return | ResDeleteUserDto', async () => {
      const result = await controller.deleteUser(id, username);
      expect(result).toBeInstanceOf(ResDeleteUserDto);
    });
  });

  // GETUSERBOARDS: - make, run, return
  describe('Get User Boards', () => {
    const id: number = user.id;
    const page: number = 1;

    it('Make | getUserBoards', () => {
      expect(typeof controller.getUserBoards).toEqual(FUNCTION);
    });

    it('Run | getUserBoards(id: number, page: number)', () => {
      const getUserBoards = jest.fn();
      controller.getUserBoards = getUserBoards;
      controller.getUserBoards(id, page);
      expect(controller.getUserBoards).toHaveBeenCalledWith(id, page);
    });

    it('Return | ResGetUserBoardsDto', async () => {
      const result = await controller.getUserBoards(id, page);
      expect(result).toBeInstanceOf(ResGetUserBoardsDto);
    });
  });

  // CREATEFOLLOW: - make, run, return
  describe('Create Follow', () => {
    const id: number = otherUser.id;
    const username: string = user.username;

    it('Make | createFollow', () => {
      expect(typeof controller.createFollow).toEqual(FUNCTION);
    });

    it('Run | createFollow(id: number, username: string)', () => {
      const createFollow = jest.fn();
      controller.createFollow = createFollow;
      controller.createFollow(id, username);
      expect(controller.createFollow).toHaveBeenCalledWith(id, username);
    });

    it('Return | ResCreateFollowDto', async () => {
      const result = await controller.createFollow(otherUser.id, username);
      expect(result).toBeInstanceOf(ResCreateFollowDto);
    });
  });

  // DELETEFOLLOW: - make, run, return
  describe('Delete Follow', () => {
    const id: number = otherUser.id;
    const username: string = user.username;

    it('Make | deleteFollow', () => {
      expect(typeof controller.deleteFollow).toEqual(FUNCTION);
    });

    it('Run | deleteFollow(id: number, username: string)', () => {
      const deleteFollow = jest.fn();
      controller.deleteFollow = deleteFollow;
      controller.deleteFollow(id, username);
      expect(controller.deleteFollow).toHaveBeenCalledWith(id, username);
    });

    it('Return | ResDeleteFollowDto', async () => {
      const result = await controller.deleteFollow(influencer.id, username);
    });
  });
});
