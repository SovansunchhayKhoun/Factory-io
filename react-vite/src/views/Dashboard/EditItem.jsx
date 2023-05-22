// eslint-disable-next-line no-unused-vars
import React, {useContext, useEffect, useState} from "react";
import { useNavigate, useParams} from "react-router-dom";
import {ArrowLeftIcon} from "@heroicons/react/20/solid/index.js";
import ProductContext from "../../context/ProductContext.jsx";
import axios from "axios";

export const EditItem = () => {
  const navigate = useNavigate()

  const {getItem, errors,formValues, onChange,updateItem} = useContext(ProductContext)
  const [image,setImage] = useState("");
  let {id} = useParams()

  const onSubmit = async (e) => {
    e.preventDefault()
    formValues.qty > 0 ? formValues.status = 1 : formValues.status = 0;
    const formData = new FormData();
    formData.append('_method','PUT')
    formData.append('name',formValues['name'])
    formData.append('type',formValues['type'])
    formData.append('description',formValues['description'])
    formData.append('qty',formValues['qty'])
    formData.append('price',formValues['price'])
    formData.append('status',formValues['status'])
    if(image){
     formData.append('image', image)
    }
    updateItem(formData)
  }
  useEffect(() => {
    getItem(id)
  }, [])

  return (
    <>
      <button className="m-4" onClick={() => {
        navigate(-1)
      }}>
        <ArrowLeftIcon className="h-6 mr-5"/>
      </button>
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-1/2 max-w-9xl mx-auto">
        <form className="space-y-6 p-12" onSubmit={onSubmit}>
          <div>
            <label htmlFor="ProductName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Product Name</label>
            {errors.name && <span className="text-sm text-red-400">{errors.name[0]}</span>}
            <input type="name" name="name" id="name"
                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                   value={formValues['name']}
                   onChange={onChange}
                   required/>
          </div>
          <div className="flex gap-8">
            <label htmlFor="Qty" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Qty</label>
            <input type="number" name="qty" id="qty"
                   value={formValues['qty']}
                   onChange={onChange}
                   min="0"
                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                   required/>
            <label htmlFor="Price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Price</label>
            <input type="number" name="price" id="price"
                   value={formValues['price']}
                   onChange={onChange}
                   min="1"
                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                   required/>
          </div>
          <div>
            <label htmlFor="Type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Type</label>
            <input name="type" id="type"
                   value={formValues['type']}
                   onChange={onChange}
                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                   required/>
          </div>
          <div>
            <label htmlFor="ProductName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Description</label>
            <input name="description" id="description"
                   value={formValues['description']}
                   onChange={onChange}
                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                   required/>
          </div>
          <input name="image" id="image"
                 type="file"
                 accept="image/png, image/jpeg"
                 onChange={(e) => setImage(e.target.files[0])}
                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          />
          <button type="submit"
            // onClick={() => setModalOpen(!modalOpen)}
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Store
          </button>
        </form>
      </div>
    </>

  )
}
