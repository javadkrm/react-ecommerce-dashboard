import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "@/pages/Login"
import PrivateRoute from "./PrivateRoute"
import Dashboard from "@/pages/Dashboard"

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard/></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  )
}
