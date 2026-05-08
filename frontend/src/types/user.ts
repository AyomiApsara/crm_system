export interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "salesperson";
  created_at: string;
}