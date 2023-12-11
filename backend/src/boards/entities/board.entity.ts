import { BaseModel } from 'src/common/entities/base.entity';
import { Column, Entity, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { CommentModel } from './comment.entity';
import { UserModel } from 'src/users/entities/user.entity';

@Entity()
export class BoardModel extends BaseModel {
  @Column()
  title: string;

  @Column()
  content: string;

  @OneToMany(() => CommentModel, (comment) => comment.board)
  comments: CommentModel[];

  @ManyToMany(() => UserModel, (user) => user.likes)
  likes: UserModel[];

  @OneToMany(() => UserModel, (user) => user.views)
  views: UserModel[];

  @ManyToOne(() => UserModel, (user) => user.boards)
  user: UserModel;
}
