import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import './index.css'
import StarterPage from "./pages/Starter.page.jsx"
import LoginPage from './pages/LoginPage.jsx';
import HomePage from "./pages/Home.page.jsx"
import SignUpPage from "./pages/Signup.page.jsx"
const router = createBrowserRouter([
  {
    path:"/",
    element: <App/>,
    children:[
      {
        path: "/",
        element:
        <>
          <StarterPage/>
        </>
      },
      {
        path: "/login",
        element:
        <>
          <LoginPage/>
        </>
      }
      ,
      {
        path: "/home",
        element:
        <>
          <HomePage/>
        </>
      },
      {
        path: "/signup",
        element:
        <>
          <SignUpPage/>
        </>
      }

    ]
  }
])



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
        <RouterProvider router={router} />
  </React.StrictMode>,
)
