export interface User {
  id: number
  name: string
  email: string
  password: string
  role: "user" | "admin"
}



export interface AuthState {
  currentUser: User | null
  users: User[]
  error: string | null
}