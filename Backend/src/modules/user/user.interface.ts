export interface IUser {
  _id?: string;
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string | null;
  role?: "admin" | "user";
  createdAt: Date;
  updatedAt: Date;
}
