import { BaseModel } from 'src/common/entities/base.entity';
import { Entity, ManyToMany, OneToMany } from 'typeorm';
import { ChatModel } from './chat.entity';
import { UserModel } from './user.entity';

@Entity()
export class RoomModel extends BaseModel {
  @OneToMany(() => ChatModel, (chat) => chat.room)
  chats: ChatModel[];

  @ManyToMany(() => UserModel, (user) => user.rooms, {
    onDelete: 'CASCADE',
  })
  users: UserModel[];
}
