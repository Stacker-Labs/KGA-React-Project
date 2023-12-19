import React, { useState } from "react";
import Input from "../atoms/Inputs";
import Button from "../atoms/Buttons";
import { RegisterRequest } from "../../pages/auth/dto/RegisterDTO";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const navigate = useNavigate();

  const [image, setImage] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [confirmed, setConfirmed] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmed) {
      setError("Passwords do not match!");
      return;
    }

    setError("");

    const uploadImageToS3 = async (file) => {
      try {
        const response = await fetch("https://api.subin.kr/image", {
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data", // or appropriate content type
          },
          body: file,
        });
        const data = await response.json();
        console.log(data.url);

        return data.url;
      } catch (error) {
        console.error("Error uploading image:", error);
        throw error;
      }
    };

    try {
      const imageUrl = await uploadImageToS3(image);

      const response = await fetch("https://api.subin.kr/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          new RegisterRequest({ id, password, nickname, image: imageUrl })
        ),
      });
      const result = await response.json();
      console.log(result);
      // reset form?
      if (result) navigate("/");
      // toastify
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      className="flex flex-col gap-y-3 items-center"
    >
      <div className="relative self-start flex flex-col items-center px-3 mx-1">
        <label
          htmlFor="image"
          className="-top-6 left-4 absolute self-start text-lg text-gray-700"
        >
          Profile Picture
        </label>
        <Input
          onChange={(e) => setImage(e.target.files[0])}
          type="file"
          name="image"
          id="image"
        />
      </div>
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
  );
};

export default RegisterForm;
