import {useNavigate, createBrowserRouter, useRouteError} from "react-router-dom"
import Login from "./views/Login"
import Signup from "./views/Signup"
import {MakerLanding} from "./views/Makerio/MakerLanding.jsx";
import {NotFound} from "./views/NotFound.jsx";
import {MakerLayout} from "./layouts/MakerLayout.jsx";
import {ItemView} from "./views/Makerio/ItemView.jsx";
import {CartView} from "./views/Makerio/CartView.jsx";
import {DashboardLanding} from "./views/Dashboard/DashboardLanding.jsx";
import {DashboardLayout} from "./layouts/DashboardLayout.jsx";
import {Inventory} from "./views/Dashboard/Inventory.jsx";
import {UserView} from "./views/UserView";
import {AdminOrder} from "./views/Dashboard/AdminOrder.jsx";
import {EditItem} from "./views/Dashboard/EditItem.jsx";
import {OrderView} from "./views/Makerio/OrderView.jsx";
import {LandingHero} from "./views/Makerio/LandingHero.jsx";
import {Users} from "./views/Users.jsx";
import {EditUser} from "./views/EditUser.jsx";
import {ChangePasswordView} from "./views/ChangePasswordView.jsx";
import {Chat} from "./views/Dashboard/Chat.jsx";
import {ErrorBoundary} from "./components/ErrorBoundary.jsx";
import {useJsApiLoader} from "@react-google-maps/api";
import {LandingPage} from "./views/Factoryio/LandingPage.jsx";
import {LandingLayout} from "./layouts/LandingLayout.jsx";
import {Communitylanding} from "./views/Factoryio/Communitylanding.jsx";
import {RnDLanding} from "./views/Factoryio/RnDlanding.jsx";
import {ContestLanding} from "./views/Factoryio/ContestLanding.jsx";
import {FactoryHome} from "./views/Factoryio/FactoryHome.jsx";
import {AccountView} from "./views/Factoryio/AccountView.jsx";
import {AdminView} from "./views/AdminView.jsx";

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingLayout/>,
    children: [
      {
        path: '',
        element: <LandingPage/>
      },
      {
        path: 'community',
        element: <Communitylanding/>
      },
      {
        path: 'rd',
        element: <RnDLanding/>
      },
      {
        path: 'contest',
        element: <ContestLanding/>
      },
      {
        path: 'user',
        element: <AccountView/>
      },
      {
        path: 'explore',
        element: <FactoryHome/>
      }
    ]
  },

  {
    path: '/makerio',
    element: <MakerLayout/>,
    children: [
      {
        path: '',
        element: <LandingHero/>,
        errorElement: <ErrorBoundary/>
      },
      {
        path: 'shop',
        element: <MakerLanding/>,
        errorElement: <ErrorBoundary/>
      },
      {
        path: '/makerio/:id',
        element: <ItemView/>,
        errorElement: <ErrorBoundary/>
      },
      {
        path: 'user',
        element: <UserView/>,
        errorElement: <ErrorBoundary/>
      },
      {
        path: 'admin',
        element: <AdminView/>,
        errorElement: <ErrorBoundary />
      },
      {
        path: 'user/change-password',
        element: <ChangePasswordView/>,
        errorElement: <ErrorBoundary/>
      },
      {
        path: 'cart',
        element: <CartView/>,
        errorElement: <ErrorBoundary/>
      },
      {
        path: 'order',
        element: <OrderView/>,
      },
      // {
      //   path: 'customer-service',
      //   element: <CustomerService />,
      //   errorElement: <ErrorBoundary />
      // }
    ],
  },
  {
    path: '/admin',
    element: <DashboardLayout/>,
    children: [
      {
        path: 'dashboard',
        element: <DashboardLanding/>,
        errorElement: <ErrorBoundary/>
      },
      {
        path: 'inventory',
        element: <Inventory/>,
        errorElement: <ErrorBoundary/>
      },
      {
        path: 'orders',
        element: <AdminOrder/>,
        errorElement: <ErrorBoundary/>
      },
      {
        path: 'customer-service',
        element: <Chat/>,
        errorElement: <ErrorBoundary/>
      },
      {
        path: 'users',
        element: <Users/>,
        errorElement: <ErrorBoundary/>
      },
      {
        path: 'product/:id/edit',
        element: <EditItem/>,
        errorElement: <ErrorBoundary/>
      },
      {
        path: 'user/:id/edit',
        element: <EditUser/>,
        errorElement: <ErrorBoundary/>
      }
    ]
  },

  {
    path: '*',
    element: <NotFound/>
  },

  {
    path: '/login',
    element: <Login/>,
    errorElement: <ErrorBoundary/>
  },
  {
    path: '/signup',
    element: <Signup/>,
    errorElement: <ErrorBoundary/>
  }
])
export default router
