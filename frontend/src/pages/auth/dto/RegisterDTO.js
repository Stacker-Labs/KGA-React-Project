export class RegisterRequest {
  username;
  password;
  nickname;
  bio;
  image;

  constructor(data) {
    this.username = data.id;
    this.password = data.password;
    this.nickname = data.nickname;
    this.bio = data.bio;
    this.image = data.imageLink;
  }
}
export class RegisterResponse {}
