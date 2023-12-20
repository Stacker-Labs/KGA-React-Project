import { BaseModel } from 'src/common/entities/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { UserModel } from '../../users/entities/user.entity';
import { RoomModel } from './room.entity';

@Entity()
export class ChatModel extends BaseModel {
  @Column()
  content: string;

  @ManyToOne(() => UserModel, (user) => user.chats, {
    onDelete: 'CASCADE',
  })
  user: UserModel;

  @ManyToOne(() => RoomModel, (room) => room.chats, {
    onDelete: 'CASCADE',
  })
  room: RoomModel;
}
