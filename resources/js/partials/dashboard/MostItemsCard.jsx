import React, {useContext, useEffect, useState} from 'react';
import ProductContext from "../../context/ProductContext.jsx";
import {useQuery} from "@tanstack/react-query";
import Axios from "axios";

const imgUrl = import.meta.env.VITE_APP_URL;
function MostItemsCard() {
  const [mostSoldItem, setMostSoldItem] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  // const {data, refetch: mostSoldItemQueryReFetch} = useQuery(['mostSoldItem'], () => {
  //   return Axios.get('http://127.0.0.1:8000/api/v1/mostSoldItem').then((res) => {
  //     setMostSoldItem(res.data.data);
  //     console.log(res.data.data)
  //     return res.data.data;
  //   });
  // });
  const getMostSoldItem = async () => {
    setIsLoading(true)
    await Axios.get('mostSoldItem').then(({data}) => {
      setMostSoldItem(data.data)
      setIsLoading(false)
    }).catch((e) => {
      console.log(e)
    })
  }
  useEffect(() => {
    getMostSoldItem()
  }, [])
  if(!isLoading){
    return (
      <div className="col-span-full xl:col-span-8 bg-white shadow-lg rounded-sm border border-slate-200 mb-12">
        <header className="px-5 py-4 border-b border-slate-100">
          <h2 className="font-semibold text-slate-800">Most Sold items</h2>
        </header>
        <div className="p-3">
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="table-auto w-full">
              {/* Table header */}
              <thead className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm">
              <tr>
                <th className="p-2">
                  <div className="font-semibold text-left">Item</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Price</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Unit</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Total Sales</div>
                </th>
              </tr>
              </thead>
              {/* Table body */}
              <tbody className="text-sm font-medium divide-y divide-slate-100">
              {
                mostSoldItem?.length === 0 &&
                    <tr>
                      <td className="p-2">
                        No items yet
                      </td>
                    </tr>
              }
              {
                mostSoldItem?.map((item,key) => {
                  return(
                      <tr key={key}>
                        <td className="p-2">
                          <div className="flex items-center">
                            {
                              item?.product[0].image === null || item?.product[0].image === 'undefined'
                                ? <img className="w-[100px] mb-5 mr-8" src="/assets/images/makerio.png"/>
                                :<img className="w-[100px] mb-5 mr-8" src={`${imgUrl}/${item?.product[0].image}`}/>
                            }
                            <div className="text-slate-800">{item?.product[0].name}</div>
                          </div>
                        </td>
                        <td className="p-2">
                          <div className="text-center">$ {item?.product[0].price}</div>
                        </td>
                        <td className="p-2">
                          <div className="text-center">{item?.totalSold}</div>
                        </td>
                        <td className="p-2">
                          <div className="text-center text-green-500">$ {item?.product[0].price * item?.totalSold}</div>
                        </td>
                      </tr>
                  )
                })

              }
              {/* Row */}

              </tbody>
            </table>

          </div>
        </div>
      </div>
    );
  }

}

export default MostItemsCard;
