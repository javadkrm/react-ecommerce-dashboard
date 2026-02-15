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
    </div>
  )
}

export default App
