export interface IUser {
  email: string | null;
  password: string | null;
  type: string | null;
  provider_type : string;
  created_at: Date;
  updated_at: Date;
  user_id: number;
  username: string | null;
}