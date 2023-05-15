import {Link} from "react-router-dom";
import {useContext} from "react";
import ProductContext from "../context/ProductContext.jsx";
import Axios from "axios";

export const ItemRow = (props) => {
  const {getItems} = useContext(ProductContext)
  const deleteItem = async (id) => {
    await Axios.delete("http://127.0.0.1:8000/api/v1/products/" + id)
    getItems()
  }

  const {id,name,qty,price,description} = props.item
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
              $ {description}
            </td>
            <td className="px-6 py-4">
              <img width="180" src="/assets/images/board.jpg" alt=""/>
            </td>
            <td className="px-4 py-4 flex">
              <Link to={`/admin/product/${id}/edit`} className="bg-blue-600 px-4 py-2 rounded text-whiteFactory dark:text-whiteFactory-500 mr-2">Edit</Link>
              <button onClick={() => {
                deleteItem(id)
              }} className="bg-red-600 px-4 py-2 rounded text-whiteFactory dark:text-whiteFactory-500">Delete</button>
            </td>
          </tr>
        </>
    )
}
