export type User = {
    id: string
    name: string
    email: string
    password: string
    role: 'admin' | 'user'
    token: string
}


export interface AuthState {
  currentUser: User | null
  users: User[]
}