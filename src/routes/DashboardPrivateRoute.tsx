import { useAppSelector } from "@/app/hook"
import { Navigate } from "react-router-dom"

interface Props {
    children: React.ReactNode
}
export default function DashboardPrivateRoute({ children }: Props) {

    const user = useAppSelector(state => state.auth.currentUser)

    if (user?.role !== 'admin') {
        alert('You Can Not Access To This Page')
        return <Navigate to='/' replace />
    }

    return <>{children}</>
}
