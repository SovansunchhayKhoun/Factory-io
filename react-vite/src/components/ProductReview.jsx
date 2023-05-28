import {useState} from "react";
import Axios from "axios";

export const ProductReview = (props) => {
  const {id} = props.item;
  const [title,setTitle] = useState("")
  const [description,setDescription] = useState("")
  const [errors, setErrors] = useState([]);
  const handleSubmit = async (e) => {
    e.preventDefault()
    const formValue = new FormData()
    formValue.append('product_id',id)
    formValue.append('title',title)
    formValue.append('description',description)
    try {
      await Axios.post('reviews',formValue)
      setTitle('')
      setDescription('')
      setErrors([])
    }catch (e){
      if (e.response.status === 422) {
        setErrors(e.response.data.errors)
        console.log(e.response.data.errors)
      }
    }
  }
    return (
        <>
          <div
            className="max-w-[1000px] p-6 bg-white border border-gray-200 rounded-lg shadow mx-auto min-w-[300px] mt-16 flex flex-col gap-4">
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
            <button onClick={handleSubmit} className="py-2 px-4 bg-tealActive rounded text-white font-semibold hover:bg-tealBase">Submit</button>
          </div>
        </>
    )
}
