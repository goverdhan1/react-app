export interface IBaseUser {
  name: string;
  gender: string;
  dob:any;
}
export interface IUser extends IBaseUser {
  id: number;
}
