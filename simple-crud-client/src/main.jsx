import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import User_s from './Components/User_s.jsx';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Update from './Components/Update.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
  },
  {
    path: "/users",
    element: <User_s></User_s>,
    loader: ()=> fetch('http://localhost:5000/users'),
  },
  {
    path: '/update/:id',
    element: <Update></Update>,
    loader: ({params}) => fetch(`http://localhost:5000/users/${params.id}`)
  }
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
