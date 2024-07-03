import './sass/importIcons.scss'
import './sass/importClasses.scss'
import './sass/importComponents.scss'
import ReactDOM from 'react-dom/client'
import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

//Redux
import {Provider} from 'react-redux';
import {store} from './store.js';

//pages
import App from './App.jsx'
import NotFound from './pages/404/NotFound.jsx'
import Home from './pages/Home/Home.jsx'
import Profile from './pages/Profile/Profile.jsx'
import Login from './pages/Auth/Login.jsx'
import Register from './pages/Auth/Register.jsx'

//redirect routes
import PublicRoute from './components/PublicRoute.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

const router = createBrowserRouter([
  {
    path:"/",
    element: <App/>,
    errorElement: <NotFound/>,
    children:[
      {
        path:"/",
        element: (<ProtectedRoute><Home /></ProtectedRoute>)
        
      },
      {
        path:"/users/:id",
        element: (<ProtectedRoute><Profile /></ProtectedRoute>)
      },
      {
        path:"/profile",
        element: (<ProtectedRoute><Profile /></ProtectedRoute>)
      },
      {
        path:"/login",
        element: (<PublicRoute><Login /></PublicRoute>)
      },
      {
        path:"/register",
        element:(<PublicRoute><Register /></PublicRoute>)
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
