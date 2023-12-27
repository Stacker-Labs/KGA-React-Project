export const followReducer = (state, action) => {
  switch (action.type) {
    case `TOGGLE_FOLLOW`:
      return {
        ...state,
        [action.followerId]: !state[action.followerID],
      };
    default:
      return state;
  }
};
