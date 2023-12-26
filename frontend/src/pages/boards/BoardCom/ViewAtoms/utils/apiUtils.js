const fetchUserInformation = async (usersId, newComment) => {
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
    } else {
      console.error("Failed to add comment:", response.status);
    }
  } catch (error) {
    console.error("Error fetching user information:", error);
  }
};

export { fetchUserInformation };
