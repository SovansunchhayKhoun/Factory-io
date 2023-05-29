// eslint-disable-next-line no-unused-vars
import React, {useRef, useEffect, useState, useContext} from 'react';
import Transition from '../../utils/Transition.jsx';
import {useAuthContext} from "../../context/AuthContext.jsx";
import Axios from "axios";
import ProductContext from "../../context/ProductContext.jsx";

function ReviewModal({
                          productID,
                           // eslint-disable-next-line react/prop-types
                           id,
                           // eslint-disable-next-line react/prop-types
                           modalOpen,
                           // eslint-disable-next-line react/prop-types
                           setModalOpen
                         }) {

  const modalContent = useRef(null);
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [errors, setErrors] = useState([]);
  const {token, user} = useAuthContext()
  const {reviewsQueryReFetch}= useContext(ProductContext)
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (token) {
      const formValue = new FormData()
      formValue.append('product_id', productID)
      formValue.append('title', title)
      formValue.append('description', description)
      formValue.append('user_id', user?.id)
      try {
        await Axios.post('reviews', formValue)
        setTitle('')
        setDescription('')
        setErrors([])
        reviewsQueryReFetch()
      } catch (e) {
        if (e.response.status === 422) {
          setErrors(e.response.data.errors)
          console.log(e.response.data.errors)
        }
      }
    } else {
      setErrors([
        {
          noAccount: 'Please sign in to make a review'
        }
      ])
    }
  }
  // close on click outside
  // useEffect(() => {
  //   const clickHandler = ({target}) => {
  //     if (!modalOpen || modalContent.current.contains(target)) return
  //     setModalOpen(false);
  //   };
  //   document.addEventListener('click', clickHandler);
  //   return () => document.removeEventListener('click', clickHandler);
  // });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({keyCode}) => {
      if (!modalOpen || keyCode !== 27) return;
      setModalOpen(false);
      setTitle('')
      setDescription('')
      setErrors([])
    };
    document.addEventListener('keydown', keyHandler);

    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    modalOpen
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
        <>
          <div
            className="max-w-[1000px] p-6 bg-white border border-gray-200 rounded-lg shadow mx-auto min-w-[600px] mt-16 flex flex-col gap-4">
            <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">WRITE A REVIEW</h5>
            <div className="flex flex-col">
              <label htmlFor="title" className="mb-2">Title: </label>
              <input className="py-2 px-4 border border-blackFactory rounded-md" id="title" name="title" onChange={e => setTitle(e.target.value)} value={title}/>
              <span className="text-sm text-red-600 mt-2">{errors.title}</span>
            </div>
            <div className="flex flex-col">
              <label htmlFor="description" className="mb-2">Description: </label>
              <input className="py-2 px-4 border border-blackFactory rounded-md" id="description" name="description" onChange={e => setDescription(e.target.value)} value={description}/>
              <span className="text-sm text-red-600 mt-2">{errors.description}</span>
            </div>
            <span className="text-sm text-red-600 mt-2">{errors[0]?.noAccount}</span>
            <button onClick={handleSubmit} className="py-2 px-4 bg-tealActive rounded text-white font-semibold hover:bg-tealBase">Submit</button>
          </div>
        </>
      </Transition>
      {/* Modal backdrop */}

    </>
  );
}

export default ReviewModal;
