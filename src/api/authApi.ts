import type { User } from "@/features/auth/types"

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const loginApi = async (email: string, password: string) => {
    await delay(800)

    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]")

    const user = users.find(
        u => u.email === email && u.password === password
    )

    if (!user) {
        throw new Error("Invalid credentials")
    }

    return user
}

export const registerApi = async (userData: User) => {
    await delay(800)

    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]')

    const isExist = users.find(u => u.email === userData.email)

    if (isExist) {
        throw new Error("Email already exists")
    }

    users.push(userData)

    localStorage.setItem('currentUser', JSON.stringify(userData))
    localStorage.setItem('users', JSON.stringify(users))

    return userData
}