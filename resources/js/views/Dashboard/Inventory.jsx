import React from "react";
import WelcomeBanner from "../../partials/dashboard/WelcomeBanner.jsx";
import { useEffect, useState} from "react";
import {ItemRow} from "../../components/ItemRow.jsx";
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
      <div className="flex justify-between items-center align-middle gap-8">
      <input placeholder="Search . . . " className=" rounded-md border border-slate-600 w-full py-2 px-12 search-bar" onChange={(e) => setSearchInput(e.target.value)}/>
        <button
          className={`whitespace-nowrap bg-blue-600 px-4 py-2 rounded-lg text-whiteFactory dark:text-whiteFactory-500 ${createItemModalOpen && 'bg-blue-900'}`}
          onClick={(e) => { e.stopPropagation(); setCreateItemModalOpen(true); }}
          aria-controls="create-item-modal"
        >
          Create Item
        </button>
      </div>
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
                  No items yet
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
