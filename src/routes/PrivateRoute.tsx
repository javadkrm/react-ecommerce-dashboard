import { useAppSelector } from '@/app/hook'
import React from 'react'
import { Navigate } from 'react-router-dom'

type Props = {
  children: React.ReactNode
}

export default function PrivateRoute({ children }: Props) {
  
  const user = useAppSelector((state) => state.auth.currentUser)

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}