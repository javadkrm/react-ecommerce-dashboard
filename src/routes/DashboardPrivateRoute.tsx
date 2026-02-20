import { useAppSelector } from "@/app/hook"
import toast from "react-hot-toast"
import { Navigate } from "react-router-dom"

interface Props {
    children: React.ReactNode
}
export default function DashboardPrivateRoute({ children }: Props) {

    const user = useAppSelector(state => state.auth.currentUser)

    if (user?.role !== 'admin') {
        toast.error('You Can Not Access To This Page')
        return <Navigate to='/' replace />
    }

    return <>{children}</>
}
