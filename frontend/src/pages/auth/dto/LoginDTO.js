export class LoginResponse {}

export class LoginRequest {
  username;
  password;

  constructor(data) {
    this.username = data.id;
    this.password = data.password;
  }
}
