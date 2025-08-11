import { BrowserRouter, Route, Routes } from "react-router-dom"
import NavbarMenu from "./components/user/Navbar"
import LandingPage from "./pages/LandingPage"
import SignupPage from "./pages/SignupPage"
import DashboardPage from "./pages/DashboardPage"
import { Toaster } from "react-hot-toast"
import ProtectedRoute from "./components/user/ProtectedRoutes"
import Footer from "./components/user/Footer"


function App() {

  return (
    <>
    <Toaster position="bottom-center" reverseOrder={false}/>
    <BrowserRouter>
    <NavbarMenu />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LandingPage />} />
        <Route path="/signup" element={<SignupPage />} />
        
        {/* <Route path="/dashboard" element={<DashboardPage />} /> */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        } />

      </Routes>
      <Footer />
    </BrowserRouter>
    </>
  )
}

export default App
