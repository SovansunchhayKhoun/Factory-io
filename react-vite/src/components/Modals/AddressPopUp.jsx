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
    getLtLgAd
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
    // setCurrentAddress({})
  }, [modalOpen]);

  useEffect(() => {
    getAddress(latitude, longitude)
  }, [latitude, longitude])

  useEffect(() => {
    checkAddress(address)
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
               className="bg-white overflow-auto w-full max-h-full rounded shadow-lg m-auto p-14 justify-center flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <div>
                <label htmlFor="address"
                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                <input type="address" name="address" id="address"
                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                       onChange={(e) => setAddress(e.target.value)}
                       value={address}
                       required/>
              </div>
              <GoogleMaps height="200" hideSearch={true}/>
              {/*{errors.address && <span className="text-sm text-red-400">{errors.address[0]}</span>}*/}
            </div>
            {!editBtn ? <button onClick={(e) => {
                e.stopPropagation()
                storeAddress().then(() => {
                  setAddress('')
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
                  // editAddress(currentAddress.id)
                }}
                        className={`w-full mx-auto font-bold text-center text-blackFactory border border-redBase px-4 py-2 rounded-[4px] shadow-2xl`}>
                  Edit
                </button>
              </div>


            }
            <div>
              {addresses?.filter(address => address.user_id === user.id).length === 0 &&
                <div>No delivery address</div>}
              {addresses?.filter(address => address.user_id === user.id).map((address, key) => {
                return (
                  <div key={key} className="flex justify-between">
                    <p>{address.address}</p>
                    <div className="flex flex-row gap-4">
                      <button onClick={(e) => {
                        e.stopPropagation()
                        setEditBtn(!editBtn)
                        setPlaceId(address.placeId)
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
          </div>}/>
    </>
  );
}

export default AddressPopUp;
