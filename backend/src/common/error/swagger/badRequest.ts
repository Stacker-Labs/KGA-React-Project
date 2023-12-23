export const badRequest = {
  schema: {
    example: {
      message: '잘못된 요청입니다.',
      error: 'Bad Request',
      statusCode: 400,
    },
  },
};

export const followBadRequest = {
  schema: {
    example: {
      message: '자기 자신은 팔로우 할 수 없습니다.',
      error: 'Bad Request',
      statusCode: 400,
    },
  },
};
