export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
