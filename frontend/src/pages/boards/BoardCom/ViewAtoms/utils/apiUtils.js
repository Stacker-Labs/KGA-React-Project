const Token = "";
const fetchUserInformation = async (
  id,
  newComment,
  addComment,
  setNickname,
  Token
) => {
  try {
    const response = await fetch(`https://api.subin.kr/boards/${id}/comments`, {
      method: "post",
      headers: {
        Authorization: `Bearer ${Token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: newComment,
        parentCommentId: null,
      }),
    });
    const userData = await response.json();
    console.log(userData);
    const nickname = userData.user.nickname;

    addComment(newComment);
    setNickname(nickname);
  } catch (error) {
    console.error("Error fetching user information:", error);
  }
};

export { fetchUserInformation };
