import { createBrowserRouter } from "react-router-dom";
import Root from "./Routs/Root.jsx";
import Homepage from "./Routs/Homepage.jsx";
import Upload from "./Routs/Upload.jsx";
import Browse from "./Routs/Browse.jsx";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,

    children:[
      
      {
        path: "",
        element: <Homepage />
      },

      {
        path: "upload",
        element: <Upload /> 
      },

      {
        path: "browse",
        element: <Browse />
      }
    ]
  }
])