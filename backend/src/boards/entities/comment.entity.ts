import { BaseModel } from 'src/common/entities/base.entity';
import { UserModel } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { BoardModel } from './board.entity';

@Entity()
export class CommentModel extends BaseModel {
  @Column()
  content: string;

  @OneToOne(() => CommentModel, (comment) => comment.comment)
  @JoinColumn()
  comment: CommentModel;

  @ManyToOne(() => BoardModel, (board) => board.comments)
  board: BoardModel;

  @ManyToOne(() => UserModel, (user) => user.comments)
  user: UserModel;
}
