// eslint-disable-next-line no-unused-vars
import React, {useRef, useEffect, useState, useContext} from 'react';
import Transition from '../../utils/Transition.jsx';
import ProductContext from "../../context/ProductContext.jsx";
import {Dropdown} from "flowbite-react";
import UserContext from "../../context/UserContext.jsx";
import Axios from "axios";
import {useAuthContext} from "../../context/AuthContext.jsx";
import {useAddressContext} from "../../context/AddressContext.jsx";
import {GoogleMapsContext} from "../../context/GoogleMapsContext.jsx";
import AdminPopUp from "./AdminPopUp.jsx";

function AddressPopUp({id, modalOpen, setModalOpen, user,}) {
  const modalContent = useRef(null);
  const [editBtn, setEditBtn] = useState(false)
  const {
    GoogleMaps,
    addresses,
    setAddress,
    address,
    longitude,
    latitude,
    getAddress,
    checkAddress,
    storeAddress,
    setPlaceId,
    placeId,
    getLtLgPl,
    editAddress,
    deleteAddress
  } = useContext(GoogleMapsContext);
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
    // setAddress('')
    // setErrors({})
    setCurrentAddress({...currentAddress, user_id: user?.id})
  }, [modalOpen]);

  const handleAddressChange = (event) => {
    setCurrentAddress({...currentAddress, address: event.target.value})
  }

  const [currentAddress, setCurrentAddress] = useState({});

  useEffect(() => {
    getAddress(latitude, longitude)
  }, [latitude, longitude])

  useEffect(() => {
    checkAddress(address)
    setCurrentAddress({...currentAddress, placeId: placeId, address: address})
  }, [address, latitude, longitude]);

  useEffect(() => {
    getLtLgPl(placeId)
  }, [placeId]);

  return (
    <>
      <AdminPopUp
        modalOpen={modalOpen} setModalOpen={setModalOpen} id={"address-pop-up"}
        content={
          <div ref={modalContent}
               className="bg-white overflow-auto h-screen py-8 px-12 gap-8 flex flex-col min-w-[900px]">
            <div className="flex flex-col gap-4">
              <div>
                <label htmlFor="address"
                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                <button onClick={e => {
                  e.stopPropagation()
                  setModalOpen(false)
                  setCurrentAddress({})
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                       stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
                <input type="address" name="address" id="address"
                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                       onChange={(e) => handleAddressChange(e)}
                       value={currentAddress?.address ?? ''}
                       required/>
              </div>
              <GoogleMaps height="300" hideSearch={true}/>
              {/*{errors.address && <span className="text-sm text-red-400">{errors.address[0]}</span>}*/}
            </div>
            {!editBtn ? <button onClick={(e) => {
                e.stopPropagation()
                console.log(currentAddress)
                storeAddress(currentAddress).then(() => {
                  setEditBtn(false);
                  setCurrentAddress({...currentAddress, address: ''})
                })
              }}
                                className={`w-1/2 mx-auto font-bold text-center text-blackFactory border border-redBase px-4 py-2 rounded-[4px] shadow-2xl`}>
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
                  editAddress(currentAddress?.id, currentAddress)
                }}
                        className={`w-full mx-auto font-bold text-center text-blackFactory border border-redBase px-4 py-2 rounded-[4px] shadow-2xl`}>
                  Edit
                </button>
              </div>}
            <div>
              {addresses?.filter(address => address.user_id === user.id).length === 0 && <div>No delivery address</div>}
              {addresses?.filter(address => address.user_id === user.id).map((address, key) => {
                return (
                  <div key={key} className="flex justify-between border-b-2 px-4 py-2">
                    <p className=''>{address.address}</p>
                    <div className="flex flex-row gap-4">
                      <button onClick={(e) => {
                        e.stopPropagation()
                        setEditBtn(true)
                        setAddress(address.address)
                        setPlaceId(address.placeId)
                        setCurrentAddress(address)
                      }} className="text-tealActive hover:underline">Edit
                      </button>
                      <button onClick={(e) => {
                        e.stopPropagation()
                        deleteAddress(address.id)
                      }} className="text-redActive hover:underline">Delete
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>}/>
    </>
  );
}

export default AddressPopUp;
