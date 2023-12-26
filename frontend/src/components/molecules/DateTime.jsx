import React from "react";

const DateTime = ({ dateString }) => {
  const setLength = (slot) => {
    const str = `${slot}`;
    return str.length === 1 ? `0${str}` : str;
  };

  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = setLength(date.getMonth() + 1);
  const day = setLength(date.getDate());
  const hour = setLength(date.getHours());
  const minute = setLength(date.getMinutes());

  return <>{`${year}-${month}-${day} ${hour}:${minute}`}</>;
};

export default DateTime;
