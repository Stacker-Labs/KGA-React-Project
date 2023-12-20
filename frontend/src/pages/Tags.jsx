import React, { useEffect, useState } from "react";
import TagBox from "../components/molecules/TagBox";
import axios from "axios";

const Tags = () => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const tagsData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_SERVER}/tags`
        );
        console.log(response.data);
        setTags(response.data);
      } catch (error) {
        console.log(`error :`, error);
      }
    };
    tagsData();
  }, []);

  return (
    <>
      <div className="font-logo w-10/12 text-4xl mx-auto py-5">Tags</div>
      <TagBox tags={tags} linkTo={(tag) => `/tags/${tag}`} />
    </>
  );
};

export default Tags;
