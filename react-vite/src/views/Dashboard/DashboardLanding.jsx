import WelcomeBanner from "../../partials/dashboard/WelcomeBanner.jsx";
import DashboardAvatars from "../../partials/dashboard/DashboardAvatars.jsx";
import FilterButton from "../../partials/actions/FilterButton.jsx";
import Datepicker from "../../partials/actions/Datepicker.jsx";
import DashboardCard01 from "../../partials/dashboard/DashboardCard01.jsx";
import DashboardCard02 from "../../partials/dashboard/DashboardCard02.jsx";
import DashboardCard04 from "../../partials/dashboard/DashboardCard04.jsx";
import DashboardCard03 from "../../partials/dashboard/DashboardCard03.jsx";
import DashboardCard05 from "../../partials/dashboard/DashboardCard05.jsx";
import DashboardCard06 from "../../partials/dashboard/DashboardCard06.jsx";
import DashboardCard07 from "../../partials/dashboard/DashboardCard07.jsx";
import DashboardCard08 from "../../partials/dashboard/DashboardCard08.jsx";
import DashboardCard09 from "../../partials/dashboard/DashboardCard09.jsx";
import DashboardCard10 from "../../partials/dashboard/DashboardCard10.jsx";
import DashboardCard11 from "../../partials/dashboard/DashboardCard11.jsx";
import DashboardCard12 from "../../partials/dashboard/DashboardCard12.jsx";
import DashboardCard13 from "../../partials/dashboard/DashboardCard13.jsx";
import {useAuthContext} from "../../context/AuthContext.jsx";

export const DashboardLanding = () => {
      const {user} = useAuthContext()

        return (
        <>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Welcome banner */}
            <WelcomeBanner title={`Welcome Back ${user.firstName} !`}/>
          </div>
            {/* Cards */}
            <div className="mx-auto grid grid-cols-12 gap-6">

              {/*/!* Line chart (Acme Plus) *!/*/}
              {/*<DashboardCard01 />*/}
              {/*/!* Line chart (Acme Advanced) *!/*/}
              {/*<DashboardCard02 />*/}
              {/* Doughnut chart (Top Countries) */}
              <DashboardCard06 />
              {/*/!* Line chart (Acme Professional) *!/*/}
              {/*<DashboardCard03 />*/}
               {/*Bar chart (Total Revenue) */}
              <DashboardCard04 />
              {/*/!* Line chart (Real Time Value) *!/*/}
              {/*<DashboardCard05 />*/}

              {/*/!* Table (Top Channels) *!/*/}
              <DashboardCard07 />
              {/*/!* Line chart (Sales Over Time) *!/*/}
              {/*<DashboardCard08 />*/}
              {/*/!* Stacked bar chart (Sales VS Refunds) *!/*/}
              {/*<DashboardCard09 />*/}
              {/*/!* Card (Customers) *!/*/}
              {/*<DashboardCard10 />*/}
              {/*/!* Card (Reasons for Refunds) *!/*/}
              {/*<DashboardCard11 />*/}
              {/*/!* Card (Recent Activity) *!/*/}
              {/*<DashboardCard12 />*/}
              {/*/!* Card (Income/Expenses) *!/*/}
              {/*<DashboardCard13 />*/}

          </div>
        </>
    )
}
