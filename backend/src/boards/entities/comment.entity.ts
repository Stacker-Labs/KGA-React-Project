import { BaseModel } from '../../common/entities/base.entity';
import { UserModel } from '../../users/entities/user.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BoardModel } from './board.entity';

@Entity()
export class CommentModel extends BaseModel {
  @Column()
  content: string;

  @Column({
    default: false,
  })
  deleted: boolean;

  @Column({
    default: 0,
  })
  depth: number;

  @OneToMany(() => CommentModel, (comment) => comment.parentComment)
  comments?: CommentModel[];

  @ManyToOne(() => CommentModel, (comment) => comment.comments, {
    onDelete: 'CASCADE',
  })
  parentComment?: CommentModel;

  @ManyToOne(() => BoardModel, (board) => board.comments, {
    onDelete: 'CASCADE',
  })
  board?: BoardModel;

  @ManyToOne(() => UserModel, (user) => user.comments, {
    onDelete: 'CASCADE',
  })
  user: UserModel;
}
