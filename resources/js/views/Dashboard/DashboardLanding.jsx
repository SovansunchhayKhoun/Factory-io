import React from "react";
import WelcomeBanner from "../../partials/dashboard/WelcomeBanner.jsx";
import TotalSalesRevenue from "../../partials/dashboard/TotalSalesRevenue.jsx";
import TotalUserCard from "../../partials/dashboard/TotalUserCard.jsx";
import MostItemsCard from "../../partials/dashboard/MostItemsCard.jsx";
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
      <div className="mx-auto flex flex-col gap-y-8">
        <div className="flex gap-8">
          <TotalSalesRevenue/>
          <TotalUserCard/>
        </div>
        <div>
          <MostItemsCard/>
        </div>
      </div>
    </>
  )
}
