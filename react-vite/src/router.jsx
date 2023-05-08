import {useNavigate, createBrowserRouter} from "react-router-dom"
import Login from "./views/Login"
import Signup from "./views/Signup"
import {MakerLanding} from "./views/MakerLanding.jsx";
import {NotFound} from "./views/NotFound.jsx";
import {MakerLayout} from "./layouts/MakerLayout.jsx";
import {ItemView} from "./views/ItemView.jsx";
import {CartView} from "./views/CartView.jsx";
import {LandingLayout} from "./layouts/LandingLayout.jsx"
import {LandingPage} from "./views/LandingPage.jsx";
import {DashboardLanding} from "./views/DashboardLanding.jsx";
import {DashboardLayout} from "./layouts/DashboardLayout.jsx";
import {Inventory} from "./views/Inventory.jsx";
import {Communitylanding} from "./views/Communitylanding.jsx";
import {RnDLanding} from "./views/RnDlanding.jsx";
import {ContestLanding} from "./views/ContestLanding.jsx";


const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingLayout/>,
    children: [
      {
        path: '/',
        element: <LandingPage/>
      },
      {
        path: 'CommunityLanding',
        element: <Communitylanding/>
      },
      {
        path: 'RnDLanding',
        element: <RnDLanding/>
      },
      {
        path: 'ContestLanding',
        element: <ContestLanding/>
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
    path: '/admin',
    element: <DashboardLayout/>,
    children: [
      {
        path: 'dashboard',
        element: <DashboardLanding/>
      },
      {
        path: 'inventory',
        element: <Inventory/>
      }
    ]
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
