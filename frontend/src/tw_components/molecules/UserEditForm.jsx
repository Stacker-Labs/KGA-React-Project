import React, { useEffect, useState } from "react";
import Input from "../atoms/Inputs";
import Button from "../atoms/Buttons";
import { useNavigate } from "react-router-dom";
import { UserEditRequest } from "../../pages/users/dto/UserEditDTO";
import { useUpdateUserState } from "../../hooks/useUpdateUserState";
import { No_Profile } from "../../images";

const UserEditForm = ({ userid }) => {
  const navigate = useNavigate();

  const [imageLink, setImageLink] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [bio, setBio] = useState("");
  const [provider, setProvider] = useState("");
  const [confirmed, setConfirmed] = useState("");
  const [error, setError] = useState("");
  const updateUser = useUpdateUserState();

  useEffect(() => {
    const initUpdateForm = async () => {
      try {
        const response = await fetch(`https://api.subin.kr/users/${userid}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const { user: result } = await response.json();
        console.log("this is the result", result);
        setImageLink(result.image);
        setPassword(result.password);
        setNickname(result.nickname);
        setBio(result.bio);
        setProvider(result.provider);
      } catch (e) {
        console.log(e);
      }
    };

    initUpdateForm();
  }, []);

  const uploadImageToS3 = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("https://api.subin.kr/image", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      console.log("does data contain link?", data);
      setImageLink(data.link);
      return data.link;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  const update = async () => {
    try {
      const response = await fetch(`https://api.subin.kr/users/${userid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(
          new UserEditRequest({ password, nickname, bio, imageLink })
        ),
      });
      const result = await response.json();
      console.log("is registered?", result);
      // reset form?
      if (result) {
        updateUser();
        navigate("/");
      }
      // toastify
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ((provider === 'LOCAL') && (password !== confirmed)) {
      setError("Passwords do not match!");
      return;
    }

    setError("");

    update();
  };

  return (
    <div className="flex flex-col items-center">
      <form
        className="flex flex-row w-[90%] justify-between"
        encType="multipart/form-data"
      >
        <Input
          onChange={async (e) => {
            await uploadImageToS3(e.target.files[0]);
          }}
          type="file"
          name="file"
          className={`w-[60%]`}
        />
        <div className="w-[120px]">
          <img src={imageLink || No_Profile} className="rounded-full" />
        </div>
      </form>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-y-3 items-center"
      >
        <Input
          onChange={(e) => setNickname(e.target.value)}
          required
          type="text"
          placeholder="Nickname"
          value={nickname}
        />
        <textarea
          cols={49}
          rows={10}
          onChange={(e) => setBio(e.target.value)}
          type="text"
          placeholder="Bio"
          className="rounded-xl p-2 text-accent-blue resize-none"
          value={bio}
        />
        {provider === "LOCAL" && (
          <Input
            onChange={(e) => setPassword(e.target.value)}
            required
            type="password"
            placeholder="Password"
          />
        )}
        {provider === "LOCAL" && (
          <Input
            onChange={(e) => setConfirmed(e.target.value)}
            required
            type="password"
            placeholder="Confirm your password"
          />
        )}
        <Button variant={"blue"} size={"sign"}>
          <span className="text-white">Register</span>
        </Button>
        {error && <div className="text-lg text-red-600">{error}</div>}
      </form>
    </div>
    // <form
    //   onSubmit={handleSubmit}
    //   encType="multipart/form-data"
    //   className="flex flex-col gap-y-3 items-center"
    // >
    //   <div className="relative self-start flex flex-col items-center px-3 mx-1">
    //     <label
    //       htmlFor="image"
    //       className="-top-6 left-4 absolute self-start text-lg text-gray-500"
    //     >
    //       Profile Picture
    //     </label>
    //     <Input
    //       onChange={(e) => setImage(e.target.files[0])}
    //       type="file"
    //       name="image"
    //       id="image"
    //     />
    //   </div>
    //   <Input
    //     onChange={(e) => setNickname(e.target.value)}
    //     required
    //     type="text"
    //     placeholder="Nickname"
    //     value={nickname}
    //   />
    // <textarea
    //   cols={49}
    //   rows={10}
    //   onChange={(e) => setBio(e.target.value)}
    //   type="text"
    //   placeholder="Bio"
    //   className="rounded-xl p-2 text-accent-blue resize-none"
    //   value={bio}
    // />
    // {provider === "LOCAL" && (
    //   <Input
    //     onChange={(e) => setPassword(e.target.value)}
    //     required
    //     type="password"
    //     placeholder="Password"
    //   />
    // )}
    // {provider === "LOCAL" && (
    //   <Input
    //     onChange={(e) => setConfirmed(e.target.value)}
    //     required
    //     type="password"
    //     placeholder="Confirm your password"
    //   />
    // )}
    //   <Button variant={"blue"} size={"sign"}>
    //     <span className="text-white">Edit</span>
    //   </Button>
    //   {error && <div className="text-lg text-red-600">{error}</div>}
    // </form>
  );
};

export default UserEditForm;
