import React, { useState } from "react";

const TagPage = ({ tagList, setTagList }) => {
  const [tagInput, setTagInput] = useState("");
  const [tagList, setTagList] = useState(value || []);

  const handleTagInputChange = (e) => {
    setTagInput(e.target.value);
  };

  const handleTagButtonClick = () => {
    if (tagInput && tagList.length < 3) {
      setTagList([...tagList, tagInput]);
      onChange([...tagList, tagInput]);
      setTagInput("");
    }
  };

  const handleTagDelete = (indexToRemove) => {
    const updatedTagList = tagList.filter(
      (_, index) => index !== indexToRemove
    );
    setTagList(updatedTagList);
    onChange(updatedTagList);
  };
  return (
    <div className="flex flex-col items-center w-[20%] ">
      <div
        className=" h-full p-[10px]   "
        style={{ position: "fixed", top: "300px" }}
      >
        <div className="flex flex-row  w-[100%] mx-auto ">
          <p>#</p>
          <input
            type="text"
            className="rounded-md w-[150px] px-[5px] text-blue-600"
            value={tagInput}
            placeholder="Enter a tag"
            maxLength={20}
            onChange={handleTagInputChange}
          />
          <button
            className="border text-center m-0 p-[5px]"
            onClick={handleTagButtonClick}
          >
            Tag
          </button>
        </div>

        <ul className="w-full mx-auto pt-10">
          {tagList.map((tag, index) => (
            <li
              key={index}
              className="border-x-4 flex flex-row w-[100%] justify-between mb-2"
            >
              # <p className="text-blue-600 ">{tag}</p>
              <button className="" onClick={() => handleTagDelete(index)}>
                x
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TagPage;
