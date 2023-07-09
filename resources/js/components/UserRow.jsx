import React from "react";
import {Link} from "react-router-dom";
import Axios from "axios";
import {useContext} from "react";
import UserContext from "../context/UserContext.jsx";
import InvoiceContext from "../context/InvoiceContext.jsx";

export const UserRow = (props) => {
  const {getUsers} = useContext(UserContext)
  const {invoicesReFetch} = useContext(InvoiceContext);
  const deleteUser = async (id) => {
    await Axios.delete("http://127.0.0.1:8000/api/v1/users/" + id)
    getUsers()
    invoicesReFetch()
  }
  const {id,firstName,lastName,gender,phoneNumber,email,username,bio} = props.user
  return (
    <>
      <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          {id}
        </th>
        <td className="px-6 py-4">
          {firstName}
        </td>
        <td className="px-6 py-4">
          {lastName}
        </td>
        <td className="px-6 py-4">
          {gender}
        </td>
        <td className="px-6 py-4">
          {phoneNumber}
        </td>
        <td className="px-6 py-4">
          {email}
        </td>
        <td className="px-6 py-4">
          {username}
        </td>
        <td className="px-6 py-4 flex">
          <Link to={`/admin/user/${id}/edit`} className="bg-blue-600 px-4 py-2 rounded text-whiteFactory dark:text-whiteFactory-500 mr-2">Edit</Link>
          <button onClick={() => {
            deleteUser(id)
          }} className="bg-red-600 px-4 py-2 rounded text-whiteFactory dark:text-whiteFactory-500">Delete</button>
        </td>
      </tr>
    </>
  )
}
