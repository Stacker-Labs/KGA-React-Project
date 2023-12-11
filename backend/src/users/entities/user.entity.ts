import { BoardModel } from 'src/boards/entities/board.entity';
import { CommentModel } from 'src/boards/entities/comment.entity';
import { Role } from 'src/common/const/role.enum';
import { BaseModel } from 'src/common/entities/base.entity';
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { RoomModel } from './room.entity';
import { ChatModel } from './chat.entity';

@Entity()
export class UserModel extends BaseModel {
  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  nickname: string;

  @Column()
  image: string;

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role;

  @ManyToMany(() => UserModel, (user) => user.following_users)
  @JoinTable({
    name: 'follow_model',
  })
  follower_users: UserModel[];

  @ManyToMany(() => UserModel, (user) => user.follower_users, {
    onDelete: 'CASCADE',
  })
  following_users: UserModel[];

  @OneToMany(() => BoardModel, (board) => board.user)
  boards: BoardModel[];

  @OneToMany(() => CommentModel, (comment) => comment.user)
  comments: CommentModel[];

  @ManyToMany(() => BoardModel, (board) => board.likes)
  @JoinTable({
    name: 'like_model',
  })
  likes: BoardModel[];

  @ManyToMany(() => BoardModel, (board) => board.views)
  @JoinTable({
    name: 'view_model',
  })
  views: BoardModel[];

  @OneToMany(() => ChatModel, (chat) => chat.user)
  chats: ChatModel[];

  @ManyToMany(() => RoomModel, (room) => room.users)
  @JoinTable()
  rooms: RoomModel[];
}
