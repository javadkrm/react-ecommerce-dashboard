import { useAppSelector } from '@/app/hook'

export default function Dashboard() {

  const user = useAppSelector(state => state.auth.user)
  return (

    <div>
      {user && <p>Welcome {user.email}</p>}
    </div>
  )
}
