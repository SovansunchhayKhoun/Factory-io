import {useNavigate, createBrowserRouter} from "react-router-dom"
import Login from "./views/Login"
import Signup from "./views/Signup"
import {MakerLanding} from "./views/Makerio/MakerLanding.jsx";
import {NotFound} from "./views/NotFound.jsx";
import {MakerLayout} from "./layouts/MakerLayout.jsx";
import {ItemView} from "./views/Makerio/ItemView.jsx";
import {CartView} from "./views/Makerio/CartView.jsx";
import {LandingLayout} from "./layouts/LandingLayout.jsx"
import {LandingPage} from "./views/Factoryio/LandingPage.jsx";
import {DashboardLanding} from "./views/DashboardLanding.jsx";
import {DashboardLayout} from "./layouts/DashboardLayout.jsx";
import {Inventory} from "./views/Inventory.jsx";
import { UserView } from "./views/UserView";


import {Communitylanding} from "./views/Factoryio/Communitylanding.jsx";
import {RnDLanding} from "./views/Factoryio/RnDlanding.jsx";
import {ContestLanding} from "./views/Factoryio/ContestLanding.jsx";
import {EditItem} from "./views/EditItem.jsx";


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
        path: 'user/:id',
        element: <UserView/>
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
      },
      {
        path: 'product/:id/edit',
        element: <EditItem/>
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
