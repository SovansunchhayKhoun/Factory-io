import WelcomeBanner from "../../partials/dashboard/WelcomeBanner.jsx";
import {Link, NavLink} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import ProductContext from "../../context/ProductContext.jsx";
import {ItemRow} from "../../components/ItemRow.jsx";
// import CreateItemModal from "../../components/Modals/CreateItemModal.jsx";
import AdminPopUp from "../../components/Modals/AdminPopUp.jsx";
import CreateItemModal from "../../components/Modals/CreateItemModal.jsx";
import {useQuery} from "@tanstack/react-query";
import Axios from "axios";


export const Inventory = () => {
  const {data: items, refetch} = useQuery(['items'], () => {
      return Axios.get('getAllItems').then((res) => {
        return res.data.data;
      });
    }, {keepPreviousData: true}
  );
  useEffect(() => {
    refetch()
  }, []);
  const [createItemModalOpen, setCreateItemModalOpen] = useState(false)
  const [searchInput,setSearchInput] = useState('')
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
      <WelcomeBanner title={`Inventory`}/>
      <button
        className={`bg-blue-600 px-4 py-2 rounded rounded-lg text-whiteFactory dark:text-whiteFactory-500 absolute right-10 ${createItemModalOpen && 'bg-blue-900'}`}
        onClick={(e) => { e.stopPropagation(); setCreateItemModalOpen(true); }}
        aria-controls="create-item-modal"
      >
        Create Item
      </button>
      <input className="rounded rounded-md border border-slate-600 w-2/3 py-2 px-4" onChange={(e) => setSearchInput(e.target.value)}/>
      <CreateItemModal id="create-item-modal" modalOpen={createItemModalOpen} setModalOpen={setCreateItemModalOpen}/>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-8">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              ID
            </th>
            <th scope="col" className="px-6 py-3">
              Product Name
            </th>
            <th scope="col" className="px-6 py-3">
              Qty
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Type
            </th>
            <th scope="col" className="px-6 py-3">
              Description
            </th>
            <th scope="col" className="px-6 py-3">
              Feature
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
              items?.length === 0 && <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                </th>
                <td className="px-6 py-4">
                </td>
                <td className="px-6 py-4">
                </td>
                <td className="px-6 py-4">
                </td>
                <td className="px-6 py-4">
                </td>
                <td className="px-6 py-4">
                </td>
                <td className="px-6 py-4">
                </td>
                <td className="px-4 py-4">
                </td>
              </tr>
            }
            {
              items?.filter((item) => {
                if(item.name.toLowerCase().includes(searchInput.toLowerCase()) || item.type.toLowerCase().includes(searchInput.toLowerCase())) {
                  return item
                }else if (searchInput === ''){
                  return item
                }
              }).map((item,key) => {
                return <ItemRow key={key} item={item}/>
            })
            }
          </tbody>
        </table>
      </div>

    </div>
  )
}
