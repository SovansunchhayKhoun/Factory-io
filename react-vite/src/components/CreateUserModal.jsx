// eslint-disable-next-line no-unused-vars
import React, {useRef, useEffect, useState, useContext} from 'react';
import Transition from '../utils/Transition.jsx';
import UserContext from "../context/UserContext.jsx";

function CreateUserModal({
                           // eslint-disable-next-line react/prop-types
                           id,
                           // eslint-disable-next-line react/prop-types
                           modalOpen,
                           // eslint-disable-next-line react/prop-types
                           setModalOpen
                         }) {

  const modalContent = useRef(null);
  const {formValues, errors, storeUser, onChange} = useContext(UserContext)

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
  }, [modalOpen]);

  return (
    <>
      {/* Modal backdrop */}
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
        <div ref={modalContent} className="bg-white overflow-auto max-w-3xl w-full max-h-full rounded shadow-lg">
          <form className="space-y-6 p-12" onSubmit={storeUser}>
            <div className="flex gap-4">
              <label htmlFor="firstName" className="block mb-2 mr-4 text-sm font-medium text-gray-900 dark:text-white">
                First Name</label>
              {errors.firstName && <span className="text-sm text-red-400">{errors.firstName[0]}</span>}
              <input type="firstName" name="firstName" id="firstName"
                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                     value={formValues['firstName']}
                     onChange={onChange}
                     required/>

              <label htmlFor="lastName" className="block mb-2 mr-4 text-sm font-medium text-gray-900 dark:text-white">
                Last Name</label>
              {errors.lastName && <span className="text-sm text-red-400">{errors.lastName[0]}</span>}
              <input type="lastName" name="lastName" id="lastName"
                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                     value={formValues['lastName']}
                     onChange={onChange}
                     required/>
            </div>
            <div className="flex gap-8">
              <div className="w-1/4">
                <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Gender</label>
                {errors.gender && <span className="text-sm text-red-400">{errors.gender[0]}</span>}
                <input type="name" name="gender" id="gender"
                       value={formValues['gender']}
                       onChange={onChange}
                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                       required/>
              </div>
              <div className="w-full">
                <label htmlFor="phoneNumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Phone Number</label>
                {errors.phoneNumber && <span className="text-sm text-red-400">{errors.phoneNumber[0]}</span>}
                <input name="phoneNumber" id="phoneNumber"
                       value={formValues['phoneNumber']}
                       onChange={onChange}
                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                       required/>
              </div>

            </div>
            <div>
              <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Username</label>
              {errors.username && <span className="text-sm text-red-400">{errors.username[0]}</span>}
              <input name="username" id="username"
                     value={formValues['username']}
                     onChange={onChange}
                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                     required/>
            </div>
            <div>
              <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Address</label>
              {errors.address && <span className="text-sm text-red-400">{errors.address[0]}</span>}
              <input name="address" id="address"
                     value={formValues['address']}
                     onChange={onChange}
                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                     required/>
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Email</label>
              {errors.email && <span className="text-sm text-red-400">{errors.email[0]}</span>}
              <input name="email" id="email"
                     value={formValues['email']}
                     onChange={onChange}
                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                     required/>
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Password</label>
              {errors.password && <span className="text-sm text-red-400">{errors.password[0]}</span>}
              <input type="password" name="password" id="password"
                     value={formValues['password']}
                     onChange={onChange}
                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                     required/>
            </div>
            <div>
              <label htmlFor="password_confirmation" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Confirm password</label>
              <input type="password" name="password_confirmation" id="password_confirmation"
                     value={formValues['password_confirmation']}
                     onChange={onChange}
                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                     required/>
            </div>
            <button type="submit"
              // onClick={() => setModalOpen(!modalOpen)}
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Create
            </button>
          </form>

        </div>
      </Transition>
    </>
  );
}

export default CreateUserModal;
