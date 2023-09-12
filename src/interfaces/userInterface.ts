export interface InputUserInterface {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
}
export interface OutputUserInterface {
  id?: string;
  userName?: string;
  email?: string;
  createdAt?: string;
  updatedAt?: string;
  message?: string;
}

export interface LoginInputInterface {
  id: string | undefined;
  email: string | undefined;
  password: string | undefined;
}

export interface LoginOutputInterface {
  id?: string | undefined;
  email: string | undefined;
  password: string | undefined;
  message: string | undefined;
}
