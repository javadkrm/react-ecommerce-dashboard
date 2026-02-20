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