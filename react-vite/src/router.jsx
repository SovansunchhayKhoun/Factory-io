import {useNavigate, createBrowserRouter} from "react-router-dom"
import Home from "./views/Home"
import Login from "./views/Login"
import Signup from "./views/Signup"
import {MakerLanding} from "./views/MakerLanding.jsx";
import {NotFound} from "./views/NotFound.jsx";
import {MakerLayout} from "./layouts/MakerLayout.jsx";
import {ItemView} from "./views/ItemView.jsx";
import {CartView} from "./views/CartView.jsx";
import {LandingLayout} from "./layouts/LandingLayout.jsx"
import {LandingPage} from "./views/LandingPage.jsx";

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingLayout/>,
    children: [
      {
        path: '/',
        element: <LandingPage/>
      },
    ]
  },
  {
    path: '/maker-io',
    element: <MakerLayout/>,
    children: [
      {
        path: '',
        element: <MakerLanding/>
      },
      {
        path: ':id',
        element: <ItemView/>
      },
      {
        path: 'cart',
        element: <CartView/>
      }
    ],
  },
  {
    path: '*',
    element: <NotFound/>
  },

  {
    path: '/login',
    element: <Login/>
  },
  {
    path: '/signup',
    element: <Signup/>
  }
])

export default router
