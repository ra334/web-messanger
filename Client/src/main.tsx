import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import 'normalize.css';

import MainPage from './pages/Main/MainPage'
import AccountPage from './pages/Account/AccountPage'
import RegisterPage from './pages/Register/RegisterPage'
import LoginPage from './pages/Login/LoginPage'


const router = createBrowserRouter([
    {
        path: '/',
        element: <MainPage></MainPage>
    },
    {
        path: '/account',
        element: <AccountPage></AccountPage>
    },
    {
        path: '/login',
        element: <LoginPage></LoginPage>
    },
    {
        path: '/register',
        element: <RegisterPage></RegisterPage>
    },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div className='container'>
        <RouterProvider router={router} />
    </div>
  </React.StrictMode>,
)
