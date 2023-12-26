import React, { useEffect, useState } from "react";
import TagBox from "../components/molecules/TagBox";
import axios from "axios";
import { cn } from "../utils/cn";

const Tags = () => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const tagsData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_SERVER}/tags`
        );
        setTags(response.data);
      } catch (error) {
        console.log(`error :`, error);
      }
    };
    tagsData();
  }, []);

  return (
    <>
      <div
        className={cn(
          "font-logo w-10/12 text-4xl mx-auto py-5 ",
          "note:w-4/5",
          "mobile:text-2xl"
        )}
      >
        Tags
      </div>
      <TagBox tags={tags} linkTo={(tag) => `/tags/${tag}`} />
    </>
  );
};

export default Tags;
