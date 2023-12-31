import { BaseModel } from '../../common/entities/base.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { CommentModel } from './comment.entity';
import { UserModel } from '../../users/entities/user.entity';
import { TagModel } from './tag.entity';

@Entity()
export class BoardModel extends BaseModel {
  @Column()
  title: string;

  @Column()
  content: string;

  @OneToMany(() => CommentModel, (comment) => comment.board)
  comments: CommentModel[];

  @ManyToMany(() => UserModel, (user) => user.likes, {
    onDelete: 'CASCADE',
  })
  likes: UserModel[];

  @ManyToMany(() => UserModel, (user) => user.views, {
    onDelete: 'CASCADE',
  })
  views: UserModel[];

  @ManyToMany(() => TagModel, (tag) => tag.boards)
  @JoinTable()
  tags: TagModel[];

  @ManyToOne(() => UserModel, (user) => user.boards, {
    onDelete: 'CASCADE',
  })
  user: UserModel;
}
