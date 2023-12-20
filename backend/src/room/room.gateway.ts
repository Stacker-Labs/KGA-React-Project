import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RoomModel } from './entities/room.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatModel } from './entities/chat.entity';
import { BadRequestException } from '@nestjs/common';
import { UserModel } from 'src/users/entities/user.entity';

@WebSocketGateway({
  namespace: /room\/*/,
  cors: {
    credentials: true,
    origin: ['https://stacker-labs.vercel.app', 'http://localhost:3000'],
  },
})
export class RoomGateway {
  constructor(
    @InjectRepository(RoomModel)
    private readonly roomRepository: Repository<RoomModel>,
    @InjectRepository(ChatModel)
    private readonly chatRepository: Repository<ChatModel>,
    @InjectRepository(UserModel)
    private readonly usersRepository: Repository<UserModel>,
  ) {}
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('send-message')
  async sendMessage(
    @MessageBody() data: any,
    @ConnectedSocket() socket: Socket,
  ) {
    const {
      user: { id },
      content,
    } = data;
    if (!content) {
      throw new BadRequestException('글을 작성해주세요.');
    }

    const user = await this.usersRepository.findOne({
      where: { id: parseInt(id) },
    });
    if (!user) {
      throw new BadRequestException('존재하지 않는 유저입니다.');
    }

    const roomId = socket.nsp.name.split('/').slice(-1)[0];
    const room = await this.roomRepository.findOne({
      where: { id: parseInt(roomId) },
    });
    if (!room) {
      throw new BadRequestException('존재하지 않는 방입니다.');
    }

    const chat = await this.chatRepository.save({ room, user, content });
    socket.broadcast.emit(roomId, chat);
  }
}
