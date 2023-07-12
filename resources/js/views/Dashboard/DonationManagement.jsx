import WelcomeBanner from "../../partials/dashboard/WelcomeBanner.jsx";
import CreateItemModal from "../../components/Modals/CreateItemModal.jsx";
import {ItemRow} from "../../components/ItemRow.jsx";
import {Card} from "flowbite-react";
import React, {useContext, useEffect, useState} from "react";
import DonateContext from "../../context/DonateContext.jsx";
import {Link} from "react-router-dom";

const imgUrl = import.meta.env.VITE_APP_URL;
export const DonationManagement = () => {
    const {donations,deleteDonation,totalDonationsReFetch,donationsQueryReFetch,totalDonation} = useContext(DonateContext)
    useEffect(() => {
      totalDonationsReFetch()
      donationsQueryReFetch()
    },[])
    return (
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
        <WelcomeBanner title={`Donation Management`}/>
        <Card className="w-1/2 mx-auto justify-center items-center flex">
          <h1 className="text-2xl font-bold text-center">Target Donation To The Community</h1>
          <div className="flex justify-center items-end">
            <div className="text-[100px] text-green-400">${totalDonation?.total === null ? '0' : totalDonation?.total}</div>
            <div className="text-[50px]">/$5</div>
          </div>
        </Card>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-8">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                No
              </th>
              <th scope="col" className="px-6 py-3">
                Username
              </th>
              <th scope="col" className="px-6 py-3">
                Amount
              </th>
              <th scope="col" className="px-6 py-3">
                Comment
              </th>
              <th scope="col" className="px-12 py-3">
                Image
              </th>
              <th scope="col" className="px-12 py-3">
              </th>
            </tr>
            </thead>
            <tbody>
            {
              donations?.length === 0 && <tr>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  No donations yet
                </th>
              </tr>
            }
            {
              donations?.map((donation,key) => {
                return (
                  <tr key={key} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {donation.id}
                    </th>
                    <td className="px-6 py-4">
                      {donation?.user[0].username}
                    </td>
                    <td className="px-6 py-4">
                      $ {donation?.amount}
                    </td>
                    <td className="px-6 py-4">
                      {donation?.comment}
                    </td>
                    <td className="px-6 py-4">
                      {
                        donation?.image === null || donation?.image === 'undefined'
                          ? <img className="w-[150px] mb-5" src="/assets/images/makerio.png"/>
                          :<img className="w-[150px] mb-5" src={`${imgUrl}/${donation?.image}`}/>
                      }
                    </td>
                    <td className="px-4 py-4">
                      <button onClick={() => {
                        deleteDonation(donation?.id)
                      }} className="bg-red-600 px-4 py-2 rounded text-whiteFactory dark:text-whiteFactory-500 items-center">Delete</button>
                    </td>
                  </tr>
                )
              })
            }
            </tbody>
          </table>
        </div>
      </div>
    )
}
