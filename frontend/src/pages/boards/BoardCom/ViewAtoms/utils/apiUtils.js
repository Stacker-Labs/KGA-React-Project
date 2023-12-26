const fetchUserInformation = async (
  usersId,
  newComment,
  addComment,
  setNickname
) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_SERVER}/boards/${usersId}/comments`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          content: newComment,
          parentCommentId: null,
        }),
      }
    );

    if (response.ok) {
      const userData = await response.json();
      console.log(userData);
      const nickname = userData.user.nickname;

      addComment(newComment);
      setNickname(nickname);
    } else {
      console.error("Failed to add comment:", response.status);
    }
  } catch (error) {
    console.error("Error fetching user information:", error);
  }
};

export { fetchUserInformation };
