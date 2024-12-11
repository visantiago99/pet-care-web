export interface UserLoginData {
  email: string;
  password: string;
}

export interface UserRegisterData {
  username: string;
  email: string;
  password: string;
}

export interface UserResponse {
  username: string;
  email: string;
  token: string;
  userId: string;
}

export interface StoredUserData {
  username: string;
  email: string;
  userId: string;
}
