import './App.css'
import Layout from '../components/layout/Layout'
import { Routes,Route } from 'react-router-dom'
import { HomePage } from '../pages/HomePage'
import { AboutPage } from '../pages/AboutPage'
import { Contact } from '../pages/Contact'
import { Policy } from '../pages/Policy'
import { PagenotFound } from '../pages/PagenotFound'
import { Register } from '../pages/Auth/Register'
import { Login } from '../pages/Auth/Login'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Dashboard } from '../pages/user/Dashboard'
import { PrivateRoute } from '../components/Routes/Private'
import { ForgotPassword } from '../pages/Auth/ForgotPassword'
import { AdminDashboard } from '../pages/Admin/AdminDashboard'
import { AdminRoutes } from '../components/Routes/AdminRoutes'
import { ThemeProvider } from '@emotion/react'
import { CreateCategory } from '../pages/Admin/CreateCategory'
import { CreateProducts } from '../pages/Admin/CreateProducts'
import { UserProfile } from '../pages/user/UserProfile'
import { UserOrders } from '../pages/user/Orders'
function App() {


  return (
    <>
    
      <Routes>
        <Route path='/' element={<HomePage/>}></Route>

        <Route path='/dashboard' element={<AdminRoutes/>}>
          <Route path='admin' element={<AdminDashboard/>}/>
          <Route path='admin/create-category' element={<CreateCategory/>}/>
          <Route path='admin/create-products' element={<CreateProducts/>}/>
        </Route>

        <Route path='/dashboard' element={<PrivateRoute/>}>
          <Route path='user' element={<Dashboard/>}/>
          <Route path='user/profile' element={<UserProfile/>}/>
          <Route path='user/orders' element={<UserOrders/>}/>
        </Route>

        <Route path='/forgotpassword' element={<ForgotPassword/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/about' element={<AboutPage/>}></Route>
        <Route path='/contact' element={<Contact/>}></Route>
        <Route path='/policy' element={<Policy/>}></Route>
        <Route path='*' element={<PagenotFound/>}></Route>
      </Routes>
      <ToastContainer/>
    </>
  )
}

export default App
