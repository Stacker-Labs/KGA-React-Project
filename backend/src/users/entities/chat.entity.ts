import { BaseModel } from 'src/common/entities/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { UserModel } from './user.entity';
import { RoomModel } from './room.entity';

@Entity()
export class ChatModel extends BaseModel {
  @Column()
  content: string;

  @ManyToOne(() => UserModel, (user) => user.chats)
  user: UserModel;

  @ManyToOne(() => RoomModel, (room) => room.chats)
  room: RoomModel;
}
