import { BoardModel } from '../../boards/entities/board.entity';

export const pagination = (
  boardList: [BoardModel[], number],
  take: number,
  skip: number,
  page: number,
) => {
  const boards = boardList[0].map((board) => ({
    ...board,
    comments: board.comments.length,
  }));

  const boardLength = boardList[1];
  const nextPage = boardLength > skip + take && page + 1;

  return { boards, boardLength, nextPage };
};
