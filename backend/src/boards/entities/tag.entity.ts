import { BaseModel } from 'src/common/entities/base.entity';
import { Column, Entity, ManyToMany } from 'typeorm';
import { BoardModel } from './board.entity';

@Entity()
export class TagModel extends BaseModel {
  @Column()
  tag: string;

  @ManyToMany(() => BoardModel, (board) => board.tags)
  boards: BoardModel[];
}
