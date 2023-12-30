import React, { useState } from "react";
import Button from "../../../../tw_components/atoms/Buttons";

const TagPage = ({ tagList, setTagList }) => {
  const [tagInput, setTagInput] = useState("");

  const handleTagInputChange = (e) => {
    setTagInput(e.target.value);
  };

  const handleTagButtonClick = () => {
    if (tagInput && tagList.length < 3) {
      setTagList([...tagList, tagInput]);
      setTagInput("");
    }
  };

  const handleTagDelete = (indexToRemove) => {
    const updatedTagList = tagList.filter(
      (_, index) => index !== indexToRemove
    );
    setTagList(updatedTagList);
  };
  return (
    <div className="w-full pl-3">
      <div className="flex flex-row items-center gap-5">
        <div className="flex flex-row items-center h-[50px]  outline-none ">
          <p>#</p>
          <input
            type="text"
            className="outline-none border-none pl-2 dark:bg-transparent"
            value={tagInput}
            placeholder="Add up to 3 tag..."
            maxLength={20}
            onChange={handleTagInputChange}
          />
          <Button variant={"white"} size={"md"} onClick={handleTagButtonClick}>
            Add
          </Button>
        </div>

        <ul className="flex flex-row gap-5 h-[50px] w-[70%] items-center mx-auto px-4 py-2">
          {tagList.map((tag, index) => (
            <li key={index} className="flex flex-row gap-3 mb-2">
              # <p className="text-blue-600 ">{tag}</p>
              <button
                className="cursor-pointer"
                onClick={() => handleTagDelete(index)}
              >
                ✖️
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TagPage;
