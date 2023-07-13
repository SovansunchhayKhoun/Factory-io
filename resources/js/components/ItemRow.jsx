import {Link} from "react-router-dom";
import React, {useContext} from "react";
import ProductContext from "../context/ProductContext.jsx";
import Axios from "axios";

const imgUrl = import.meta.env.VITE_APP_URL;
export const ItemRow = (props) => {
  const {itemsQueryReFetch} = useContext(ProductContext);
  const deleteItem = async (id) => {
    await Axios.delete(`${import.meta.env.VITE_APP_URL}/api/v1/products/` + id)
    location.reload()
    // await itemsQueryReFetch();
  }

  const {id, name, qty, price, description, image, feature, type} = props.item
  return (
    <>
      <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          {id}
        </th>
        <td className="px-6 py-4">
          {name}
        </td>
        <td className="px-6 py-4">
          {qty}
        </td>
        <td className="px-6 py-4">
          $ {price}
        </td>
        <td className="px-6 py-4">
          {type}
        </td>
        <td className="px-6 py-4">
          {description}
          {/*<textarea*/}
          {/*  defaultValue={description}*/}
          {/*  rows="8"*/}
          {/*  cols="30"*/}
          {/*  disabled={true}*/}
          {/*  className="block p-2.5 w-full h-full text-sm border-none resize-none">*/}
          {/*</textarea>*/}
        </td>
        <td>
          {feature}
          {/*<textarea*/}
          {/*  defaultValue={feature}*/}
          {/*  rows="8"*/}
          {/*  cols="30"*/}
          {/*  disabled={true}*/}
          {/*  className="block p-2.5 w-full h-full text-sm border-none resize-none">*/}
          {/*</textarea>*/}
        </td>
        <td className="px-6 py-4">
          {
            image === null || image === 'undefined'
              ? <img className="w-[150px] mb-5" src="/assets/images/makerio.png"/>
              : <img className="w-[150px] mb-5" src={`${imgUrl}/${image}`}/>
          }
        </td>
        <td className="px-4 py-4 flex">
          <Link to={`/admin/product/${id}/edit`}
                className="bg-blue-600 px-4 py-2 rounded text-whiteFactory dark:text-whiteFactory-500 mr-2">Edit</Link>
          <button onClick={() => {
            deleteItem(id)
          }} className="bg-red-600 px-4 py-2 rounded text-whiteFactory dark:text-whiteFactory-500">Delete
          </button>
        </td>
      </tr>
    </>
  )
}
``
