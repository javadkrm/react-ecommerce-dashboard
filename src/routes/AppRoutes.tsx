import {  Routes, Route } from "react-router-dom"
import Login from "@/pages/Login"
import PrivateRoute from "./PrivateRoute"
import Dashboard from "@/pages/Dashboard"
import Register from "@/pages/Register"
import ProductDetails from "@/pages/ProductDetails"
import CartPage from "@/pages/CartPage"
import Home from "@/pages/Home"

export default function AppRoutes() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<ProductDetails />} />
        <Route path="/cart" element={<PrivateRoute><CartPage/></PrivateRoute>} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard/></PrivateRoute>} />
      </Routes>
  )
}
