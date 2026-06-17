export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  role:'admin'|'user';
}

export interface dataRegisterUser {
  name: string;
  email: string;
  password: string;
  role?: 'admin'|'user';
}
export type AuthToken = {
  accessToken: string;
  expiresAt?: number;
};
export interface userSignUpData {
  name: string;
  email: string;
  password: string;
}

export interface userSigninData {

  email: string;
  password: string;

}

export interface verifyEmailData{
  email: string;
  code: string;
}