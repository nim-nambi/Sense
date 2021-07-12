export interface User {
  _id?: string;
  name?: string;
  email: string;
  phone?: string;
  city?: string;
  country?: string;
  password?: string;
  isAdmin?: boolean;
}

export interface userInfo {
  name?:string;
}