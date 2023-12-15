import React from "react";

const PageButton = ({ page, setCurrentPage, isActive }) => {
  const handleClickButton = () => {
    setCurrentPage(page);
  };
  return (
    <div isActive={isActive}>
      <button onClick={handleClickButton} isActive={isActive}>
        {page}
      </button>
    </div>
  );
};

export default PageButton;
