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
import EditProfile from './pages/EditProfile/EditProfile.jsx'
import Login from './pages/Auth/Login.jsx'
import Register from './pages/Auth/Register.jsx'
import Photo from './pages/Photo/Photo.jsx'
import Search from './pages/Search/Search.jsx'

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
        path:"/search",
        element: (<ProtectedRoute><Search /></ProtectedRoute>)
      },
      {
        path:"/users/:id",
        element: (<ProtectedRoute><Profile /></ProtectedRoute>)
      },
      {
        path:"/profile",
        element: (<ProtectedRoute><EditProfile /></ProtectedRoute>)
      },
      {
        path:"/photos/:id",
        element: (<ProtectedRoute><Photo /></ProtectedRoute>)
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
