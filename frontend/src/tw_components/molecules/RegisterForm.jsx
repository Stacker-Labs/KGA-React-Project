import React, { useEffect, useState } from "react";
import Input from "../atoms/Inputs";
import Button from "../atoms/Buttons";
import { RegisterRequest } from "../../pages/auth/dto/RegisterDTO";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const navigate = useNavigate();

  const [imageLink, setImageLink] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [bio, setBio] = useState("");
  const [confirmed, setConfirmed] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    console.log(imageLink);
  }, [imageLink]);

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

  const register = async () => {
    try {
      const response = await fetch("https://api.subin.kr/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          new RegisterRequest({ id, password, nickname, bio, imageLink })
        ),
      });
      const result = await response.json();
      console.log("is registered?", result);
      // reset form?
      if (result) navigate("/");
      // toastify
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmed) {
      setError("Passwords do not match!");
      return;
    }

    setError("");

    register();
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
          <img src={imageLink} className="rounded-full" />
        </div>
      </form>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-y-3 items-center"
      >
        <Input
          onChange={(e) => setId(e.target.value)}
          required
          type="text"
          placeholder="ID"
        />
        <Input
          onChange={(e) => setNickname(e.target.value)}
          required
          type="text"
          placeholder="Nickname"
        />
        <Input
          onChange={(e) => setPassword(e.target.value)}
          required
          type="password"
          placeholder="Password"
        />
        <Input
          onChange={(e) => setConfirmed(e.target.value)}
          required
          type="password"
          placeholder="Confirm your password"
        />
        <Button variant={"blue"} size={"sign"}>
          <span className="text-white">Register</span>
        </Button>
        {error && <div className="text-lg text-red-600">{error}</div>}
      </form>
    </div>
  );
};

export default RegisterForm;
