import { Toaster } from 'react-hot-toast'
import './App.css'
import Navbar from './components/layout/navbar/Navbar'
import AppRoutes from './routes/AppRoutes'

function App() {
  return (
    <div className='app'>
      <Navbar />
      <main>
        <AppRoutes />
      </main>
      <Toaster
        position='top-right'
        toastOptions={{
          duration: 3000,
          style: {
            background: "#111",
            color: "#fff",
          },
        }}
      />
    </div>
  )
}

export default App
