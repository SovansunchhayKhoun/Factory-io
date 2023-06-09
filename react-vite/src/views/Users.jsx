import WelcomeBanner from "../partials/dashboard/WelcomeBanner.jsx";
import React, {useContext, useEffect, useState} from "react";
import {UserRow} from "../components/UserRow.jsx";
import UserContext from "../context/UserContext.jsx";
import CreateUserModal from "../components/CreateUserModal.jsx";



export const Users = () => {
  const {users,getUsers} = useContext(UserContext)
  const [searchInput, setSearchInput] = useState('')
  useEffect(()=>{
    getUsers();
  },[])
  const [createUserModalOpen, setCreateUserModalOpen] = useState(false)
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
      <WelcomeBanner title={`Users`}/>
      <div className="flex justify-between">
        <input className="rounded rounded-md border border-slate-600 w-2/3 py-2 px-4" onChange={(e) => setSearchInput(e.target.value)}/>
        <button
          className={`bg-blue-600 px-4 py-2 rounded rounded-lg text-whiteFactory dark:text-whiteFactory-500 ${createUserModalOpen && 'bg-blue-900'}`}
          onClick={(e) => { e.stopPropagation(); setCreateUserModalOpen(true); }}
          aria-controls="create-item-modal"
        >
          Register a new users
        </button>
      </div>
      <CreateUserModal id="create-use-modal" modalOpen={createUserModalOpen} setModalOpen={setCreateUserModalOpen}/>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              ID
            </th>
            <th scope="col" className="px-6 py-3">
              First Name
            </th>
            <th scope="col" className="px-6 py-3">
              Last Name
            </th>
            <th scope="col" className="px-6 py-3">
              Gender
            </th>
            <th scope="col" className="px-6 py-3">
              Phone Number
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Username
            </th>
            <th scope="col" className="px-6 py-3">
            </th>
          </tr>
          </thead>
          <tbody>
          {
          users.length === 0 && <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
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
            </tr>
          }
          {
            users.filter((user) => {
              if(user.username.toLowerCase().includes(searchInput.toLowerCase())|| user.firstName.toLowerCase().includes(searchInput.toLowerCase()) || user.lastName.toLowerCase().includes(searchInput.toLowerCase())){
                return user
              }else if (searchInput === ''){
                return user
              }
            }).map((user,key) => {
              return <UserRow key={key} user={user}/>
            })
          }
          </tbody>
        </table>
      </div>

    </div>
  )
}
