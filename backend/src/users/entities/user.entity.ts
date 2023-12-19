import { BoardModel } from 'src/boards/entities/board.entity';
import { CommentModel } from 'src/boards/entities/comment.entity';
import { Role } from 'src/common/const/role.enum';
import { BaseModel } from 'src/common/entities/base.entity';
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { RoomModel } from './room.entity';
import { ChatModel } from './chat.entity';
import { Provider } from 'src/common/const/provider.enum';
import { Exclude } from 'class-transformer';

@Entity()
export class UserModel extends BaseModel {
  @Column()
  username: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  nickname: string;

  @Column({ nullable: true })
  image?: string;

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role;

  @Column({ type: 'enum', enum: Provider, default: Provider.LOCAL })
  provider: Provider;

  @ManyToMany(() => UserModel, (user) => user.followingUsers, {
    onDelete: 'CASCADE',
  })
  followerUsers: UserModel[];

  @ManyToMany(() => UserModel, (user) => user.followerUsers)
  @JoinTable({
    name: 'follow_model',
  })
  followingUsers: UserModel[];

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
