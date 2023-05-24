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
import {DashboardLanding} from "./views/Dashboard/DashboardLanding.jsx";
import {DashboardLayout} from "./layouts/DashboardLayout.jsx";
import {Inventory} from "./views/Dashboard/Inventory.jsx";
import { UserView } from "./views/UserView";
import {AdminOrder} from "./views/Dashboard/AdminOrder.jsx";

import {Communitylanding} from "./views/Factoryio/Communitylanding.jsx";
import {RnDLanding} from "./views/Factoryio/RnDlanding.jsx";
import {ContestLanding} from "./views/Factoryio/ContestLanding.jsx";
import {EditItem} from "./views/Dashboard/EditItem.jsx";
import {OrderView} from "./views/Makerio/OrderView.jsx";
import {LandingHero} from "./views/Makerio/LandingHero.jsx";
import {Users} from "./views/Users.jsx";
import {EditUser} from "./views/EditUser.jsx";
import {ChangePasswordView} from "./views/ChangePasswordView.jsx";
import {InvoiceList} from "./components/AdminComponents/InvoiceComponents/InvoiceList.jsx";
import {CustomerService} from "./views/Makerio/CustomerService.jsx";
import {Chat} from "./views/Dashboard/Chat.jsx";
import {AdminView} from "./views/AdminView.jsx";


const router = createBrowserRouter([
  // {
  //   path: '/',
  //   element: <LandingLayout/>,
  //   children: [
  //     {
  //       path: '/',
  //       element: <LandingPage/>
  //     },
  //     {
  //       path: 'CommunityLanding',
  //       element: <Communitylanding/>
  //     },
  //     {
  //       path: 'RnDLanding',
  //       element: <RnDLanding/>
  //     },
  //     {
  //       path: 'ContestLanding',
  //       element: <ContestLanding/>
  //     },
  //
  //   ]
  // },
  {
    path: '/',
    element: <MakerLayout/>,
    children: [
      {
        path: '',
        element: <LandingHero/>
      },
      {
        path: '/maker-io',
        element: <MakerLanding/>
      },
      {
        path: 'user/:id',
        element: <UserView/>
      },
      {
        path: 'admin/:id',
        element: <AdminView/>
      },
      {
        path: '/maker-io/user/:id/change-password',
        element: <ChangePasswordView/>
      },
      {
        path: '/maker-io/:id',
        element: <ItemView/>
      },
      {
        path: 'cart',
        element: <CartView/>
      },
      {
        path: 'order',
        element: <OrderView />,
      },
      {
        path: 'customer-service',
        element: <CustomerService />
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
        path: 'orders',
        element: <AdminOrder />,
      },
      {
        path: 'customer-service',
        element: <Chat />
      },
      {
        path: 'users',
        element: <Users/>
      },
      {
        path: 'product/:id/edit',
        element: <EditItem/>
      },
      {
        path: 'user/:id/edit',
        element: <EditUser/>
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
