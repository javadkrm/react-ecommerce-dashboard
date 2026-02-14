import type { User } from "./types"

export const loginApi = async (email: string, password: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === 'karimi.mojavad@gmail.com' && password === '@Javad#2003') {
        resolve({
          id: '1',
          email,
          role: 'admin',
          token: 'fake-jwt-token',
        })
      } else {
        reject(new Error('Invalid credentials'))
      }
    }, 1000)
  })
}
