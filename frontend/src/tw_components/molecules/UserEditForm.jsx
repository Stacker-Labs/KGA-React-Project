import React, { useEffect, useState } from "react";
import Input from "../atoms/Inputs";
import Button from "../atoms/Buttons";
import { useNavigate } from "react-router-dom";
import { UserEditRequest } from "../../pages/users/dto/UserEditDTO";
import { useUpdateUserState } from "../../hooks/useUpdateUserState";
import { No_Profile } from "../../images";
import { logoutFunc } from "../../pages/auth/Logout";
import { useResetRecoilState } from "recoil";
import { userState } from "../../recoil/userState";

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
  const resetUserState = useResetRecoilState(userState);

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
        alert("Your info has been updated.");
        navigate(`/users/${userid}`);
      }
      // toastify
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (provider === "LOCAL" && password !== confirmed) {
      setError("Passwords do not match!");
      return;
    }

    setError("");

    update();
  };

  const deleteUser = async () => {
    const willDelete = window.confirm(
      "Do you really want to delete your account?"
    );
    if (!willDelete) return;
    try {
      const response = await fetch(`https://api.subin.kr/users/${userid}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const result = await response.json();
      console.log("is deleted?", result);
      if (result.statusCode === 200) {
        // await logoutFunc()
        resetUserState();
        alert("Your account has been deleted. Goodbye!");
        navigate(`/`);
      } else {
        alert("Invalid Access.");
      }
    } catch (e) {
      console.log(e);
    }
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
          rows={10}
          onChange={(e) => setBio(e.target.value)}
          type="text"
          placeholder="Bio"
          className="w-[94%] rounded-xl p-4 text-accent-blue resize-none"
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
          <span className="text-white">Edit</span>
        </Button>
        {error && <div className="text-lg text-red-600">{error}</div>}
      </form>
      <Button
        variant={"red"}
        size={"sign"}
        className={`bg-red-500 dark:bg-red-500`}
        onClick={deleteUser}
      >
        <span className="text-white">Delete (Warning)</span>
      </Button>
    </div>
  );
};

export default UserEditForm;
