import Navbar from './components/layout/Navbar'
import { Outlet } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import Footer from './components/common/Footer'


function App() {
  return (
    <>
      <Navbar />
        <main className="min-h-screen bg-primary">
          <AppRoutes />
        </main>
      <Footer />
    </>
  )
}

export default App
