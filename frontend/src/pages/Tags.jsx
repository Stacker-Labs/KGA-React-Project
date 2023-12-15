import React, { useState } from "react";
import Header from "../components/organisms/Header";
import TagBox from "../components/molecules/TagBox";

const Tags = () => {
  const [tags, setTags] = useState([
    {
      id: 1,
      tagName: "#javascript",
      tagContent:
        "I have no special talent. I am only passionately curious. - Albert Einstein",
    },
    {
      id: 2,
      tagName: "#database",
      tagContent: "Posts on building, using, and learning about databases.",
    },
    {
      id: 3,
      tagName: "#programming",
      tagContent: "The magic behind computers. 💻 🪄",
    },
    {
      id: 4,
      tagName: "#webdev",
      tagContent: "Because the internet...",
    },
    {
      id: 5,
      tagName: "#webdev",
      tagContent: "Because the internet...",
    },
  ]);

  return (
    <>
      <Header />
      <div className="font-logo w-10/12 text-4xl mx-auto py-5">Tags</div>
      <TagBox tags={tags} setTags={setTags} />
    </>
  );
};

export default Tags;
