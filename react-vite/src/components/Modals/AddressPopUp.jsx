// eslint-disable-next-line no-unused-vars
import React, {useRef, useEffect, useState, useContext} from 'react';
import Transition from '../../utils/Transition.jsx';
import ProductContext from "../../context/ProductContext.jsx";
import {Dropdown} from "flowbite-react";
import UserContext from "../../context/UserContext.jsx";
import Axios from "axios";
import {useAuthContext} from "../../context/AuthContext.jsx";
import {useAddressContext} from "../../context/AddressContext.jsx";

function AddressPopUp({
                        // eslint-disable-next-line react/prop-types
                        id,
                        // eslint-disable-next-line react/prop-types
                        modalOpen,
                        // eslint-disable-next-line react/prop-types
                        setModalOpen,
                        // eslint-disable-next-line react/prop-types
                        user,
                      }) {

  const modalContent = useRef(null);
  const [errors, setErrors] = useState({})
  const [address, setAddress] = useState('')
  const [editBtn, setEditBtn] = useState(false)
  const {getUserAddress, addresses, userAddress} = useAddressContext();
  const [currentAddress, setCurrentAddress] = useState({})

  // close on click outside
  useEffect(() => {
    const clickHandler = ({target}) => {
      if (!modalOpen || modalContent.current.contains(target)) return
      setModalOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({keyCode}) => {
      if (!modalOpen || keyCode !== 27) return;
      setModalOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    modalOpen
    // getUserAddress(user.id)
    setEditBtn(false)
    setAddress('')
    setErrors({})
    setCurrentAddress({})
  }, [modalOpen]);

  return (
    <>
      {/*/!* Modal backdrop *!/*/}
      <Transition
        className="fixed inset-0 bg-slate-900 bg-opacity-30 z-50 transition-opacity"
        show={modalOpen}
        enter="transition ease-out duration-200"
        enterStart="opacity-0"
        enterEnd="opacity-100"
        leave="transition ease-out duration-100"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
        aria-hidden="true"
      />
      {/* Modal dialog */}
      <Transition
        id={id}
        className="fixed inset-0 z-50 overflow-hidden flex items-start top-20 mb-4 justify-center transform px-4 sm:px-6"
        role="dialog"
        aria-modal="true"
        show={modalOpen}
        enter="transition ease-in-out duration-200"
        enterStart="opacity-0 translate-y-4"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-in-out duration-200"
        leaveStart="opacity-100 translate-y-0"
        leaveEnd="opacity-0 translate-y-4"
      >
        <div ref={modalContent}
             className="bg-white overflow-auto max-w-2xl w-full max-h-full rounded shadow-lg m-auto p-14 justify-center flex flex-col gap-8">
          <div>
            <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Address</label>
            {errors.address && <span className="text-sm text-red-400">{errors.address[0]}</span>}
            <input type="address" name="address" id="address"
                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                   onChange={(e) => setAddress(e.target.value)}
                   value={address}
                   required/>
          </div>
          {
            !editBtn ? <button onClick={(e) => {
                e.stopPropagation()
                // storeAddress(e)
              }} className={`w-1/2 mx-auto font-bold text-center text-blackFactory border border-redBase px-4 py-2 rounded-[4px] shadow-2xl`}>
                Create new
              </button> :
              <div className="flex justify-between gap-4">
                <button onClick={(e) => {
                  e.stopPropagation()
                  setAddress('')
                  setEditBtn(!editBtn)
                }}
                        className={`w-full mx-auto font-bold text-center text-blackFactory border border-redBase px-4 py-2 rounded-[4px] shadow-2xl`}>
                  Cancel
                </button>
                <button onClick={(e) => {
                  e.stopPropagation()
                  // editAddress(currentAddress.id)
                }}
                        className={`w-full mx-auto font-bold text-center text-blackFactory border border-redBase px-4 py-2 rounded-[4px] shadow-2xl`}>
                  Edit
                </button>
              </div>


          }
          <div>
            {addresses?.filter(address => address.user_id === user.id).length === 0 && <div>No delivery address</div>}
            {addresses?.filter(address => address.user_id === user.id).map((address, key) => {
              return (
                <div key={key} className="flex justify-between">
                  <p>{address.address}</p>
                  <div className="flex flex-row gap-4">
                    <button onClick={(e) => {
                      e.stopPropagation()
                      setEditBtn(!editBtn)
                      setAddress(address.address)
                      setCurrentAddress(address)
                    }} className="text-tealActive">Edit
                    </button>
                    <button onClick={(e) => {
                      e.stopPropagation()
                      // deleteAddress(address.id)
                    }} className="text-redActive">Delete
                    </button>
                  </div>
                </div>

              )
            })}
          </div>
        </div>
      </Transition>
      {/* Modal backdrop */}

    </>
  );
}

export default AddressPopUp;
