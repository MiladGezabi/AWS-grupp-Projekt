import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from "react-router-dom"
import { router } from './RoutConfig.jsx'
import { RecoilRoot } from 'recoil'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <RecoilRoot>
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
  </RecoilRoot>
)
