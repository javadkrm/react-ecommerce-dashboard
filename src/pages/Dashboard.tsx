import { useAppDispatch, useAppSelector } from '@/app/hook'
import { logout } from '@/features/auth/authSlice'

export default function Dashboard() {

  const dispatch = useAppDispatch()
  const user = useAppSelector(state => state.auth.currentUser)

  const logoutHandler = () => {
    dispatch(logout())
  }
  return (

    <div>
      {user && <p>Welcome {user.name}</p>}
      <button onClick={logoutHandler}>
        Logut
      </button>
    </div>
  )
}
