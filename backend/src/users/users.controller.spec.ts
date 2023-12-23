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
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;
  const [user, otherUser] = MockUserRepository.userModels;
  const influencer = MockUserRepository.influencer;
  const FUNCTION = 'function';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: usersProviders,
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  // GETLOGINUSER: - make, use, return
  describe('Get Login User', () => {
    const username: string = user.username;

    it('Make | getLoginUser', () => {
      expect(typeof controller.getLoginUser).toBe(FUNCTION);
    });

    it('Use | getLoginUser(username: string)', async () => {
      service.getLoginUser = jest.fn();
      await controller.getLoginUser(username);
      expect(service.getLoginUser).toHaveBeenCalledWith(username);
    });

    it('Return | ResGetLoginUserDto', async () => {
      const result = await controller.getLoginUser(username);
      expect(result).toBeInstanceOf(ResGetLoginUserDto);
    });
  });

  // GETUSER: - make, use, return
  describe('Get User', () => {
    const id: number = user.id;

    it('Make | getUser', () => {
      expect(typeof controller.getUser).toBe(FUNCTION);
    });

    it('Use | getUser(id: number)', async () => {
      service.getUser = jest.fn();
      await controller.getUser(id);
      expect(service.getUser).toHaveBeenCalledWith(id);
    });

    it('Return | ResGetUserDto', async () => {
      const result = await controller.getUser(id);
      expect(result).toBeInstanceOf(ResGetUserDto);
    });
  });

  // EDITUSER: - make, use, return
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

    it('Use | editUser(id: number, reqEditUserDto: ReqEditUserDto, username: string)', async () => {
      service.editUser = jest.fn();
      await controller.editUser(id, reqEditUserDto, username);
      expect(service.editUser).toHaveBeenCalledWith(
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

  // DELETEUSER: - make, use, return
  describe('Delete User', () => {
    const id: number = user.id;
    const username: string = user.username;

    it('Make | deleteUser', () => {
      expect(typeof controller.deleteUser).toBe(FUNCTION);
    });

    it('Use | deleteUser(id: number, username: string)', async () => {
      service.deleteUser = jest.fn();
      await controller.deleteUser(id, username);
      expect(service.deleteUser).toHaveBeenCalledWith(id, username);
    });

    it('Return | ResDeleteUserDto', async () => {
      const result = await controller.deleteUser(id, username);
      expect(result).toBeInstanceOf(ResDeleteUserDto);
    });
  });

  // GETUSERBOARDS: - make, use, return
  describe('Get User Boards', () => {
    const id: number = user.id;
    const page: number = 1;

    it('Make | getUserBoards', () => {
      expect(typeof controller.getUserBoards).toEqual(FUNCTION);
    });

    it('Use | getUserBoards(id: number, page: number)', async () => {
      service.getUserBoards = jest.fn();
      await controller.getUserBoards(id, page);
      expect(service.getUserBoards).toHaveBeenCalledWith(id, page);
    });

    it('Return | ResGetUserBoardsDto', async () => {
      const result = await controller.getUserBoards(id, page);
      expect(result).toBeInstanceOf(ResGetUserBoardsDto);
    });
  });

  // CREATEFOLLOW: - make, use, return
  describe('Create Follow', () => {
    const id: number = otherUser.id;
    const username: string = user.username;

    it('Make | createFollow', () => {
      expect(typeof controller.createFollow).toEqual(FUNCTION);
    });

    it('Use | createFollow(id: number, username: string)', async () => {
      service.createFollow = jest.fn();
      await controller.createFollow(id, username);
      expect(service.createFollow).toHaveBeenCalledWith(id, username);
    });

    it('Return | ResCreateFollowDto', async () => {
      const result = await controller.createFollow(otherUser.id, username);
      expect(result).toBeInstanceOf(ResCreateFollowDto);
    });
  });

  // DELETEFOLLOW: - make, use, return
  describe('Delete Follow', () => {
    const id: number = otherUser.id;
    const username: string = user.username;

    it('Make | deleteFollow', () => {
      expect(typeof controller.deleteFollow).toEqual(FUNCTION);
    });

    it('Use | deleteFollow(id: number, username: string)', async () => {
      controller.deleteFollow = jest.fn();
      await controller.deleteFollow(id, username);
      expect(controller.deleteFollow).toHaveBeenCalledWith(id, username);
    });

    it('Return | ResDeleteFollowDto', async () => {
      const result = await controller.deleteFollow(influencer.id, username);
    });
  });
});
