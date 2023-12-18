export class RegisterRequest {
  username;
  password;
  nickname;
  image;

  constructor(data) {
    this.username = data.id;
    this.password = data.password;
    this.nickname = data.nickname;
    this.image = data.image;
  }
}
export class RegisterResponse {}
