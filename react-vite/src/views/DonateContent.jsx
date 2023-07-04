import React, {useContext, useState} from "react";
import DonateContext from "../context/DonateContext.jsx";
export const DonateContent = ({setModalOpen, modalOpen}) => {
  const {
    storeDonation,
    amount,
    setAmount,
    setImage,
    comment,
    setComment,
    image,
    resetInput,
    errors,
    response,
  } = useContext(DonateContext)
  const options = [
    {value: '1', text: 'ABA - $$$'},
    {value: '2', text: 'ABA - KHR'},
  ];
  const [selected, setSelected] = useState(1);
  const handleChange = event => {
    setSelected(Number(event.target.value));
  };

  return (
    <>
      <main className="w-screen h-screen flex justify-center">
        <div className={`flex flex-col justify-center items-center`}>
          <div
            className="flex flex-col gap-y-3 p-12 rounded-md items-center h-[70%] bg-whiteFactory overflow-auto">
            <div className="flex justify-center items-center flex-row gap-x-2">
              <h1 className="font-bold text-2xl">Donate for Community Platform</h1>
              <button onClick={(e) => {
                e.stopPropagation();
                resetInput()
                setModalOpen(false);
              }} className="transition duration-200 rounded-[50%] hover:bg-blackFactory/50">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                     stroke="currentColor"
                     className="transition duration-200 w-6 h-6 hover:text-whiteFactory hover:bg-none">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
            <div className="flex gap-x-1">Target 10 000$ Currently <p className="text-red-600"> 800$</p></div>
            <select
              value={selected}
              onChange={event => handleChange(event)}
              className="bg-whiteFactory py-0 px-2 rounded-sm w-2/3
              md:text-base text-blackFactory font-semibold text-[10px]">
              {options.map((option) => {
                return (
                  <option key={option.value} value={option.value}>
                    {option.text}
                  </option>
                );
              })}
            </select>
            <div>
              {selected === 1 &&
                (
                  <img className={`object-contain
                    md:w-[200px] md:h-[200px] md:mt-0 mt-2
                    `} src="/assets/images/qr-dollars.jpg"
                       alt=""/>)}
              {selected === 2 &&
                <img className={`object-contain
                  md:w-[200px] md:h-[200px] md:mt-0 mt-2
                  `} src="/assets/images/qr-riel.jpg"
                     alt=""/>}
            </div>
            <div className="flex flex-col w-2/3">
              <label htmlFor="comment">Comment</label>
              <input
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                name="comment" id="comment" className="border border-slate-600 rounded-md px-2 py-1"/>
              {errors && <span className="text-red-600 text-sm mt-2">{errors.comment}</span>}
            </div>
            <div className="flex flex-col w-2/3">
              <label htmlFor="amount">Amount</label>
              <input
                name="amount"
                type="number"
                value={amount}
                onChange={e => {
                  const str = e.target.value
                  if (str.charAt(str.length - 1) === '.') {
                    return
                  }
                  setAmount(str)
                }}
                min="1"
                id="amount" className="border border-slate-600 rounded-md px-2 py-1"/>
              {errors && <span className="text-red-600 text-sm mt-2">{errors.amount}</span>}
            </div>
            <div className="flex flex-col w-2/3 justify-center items-center gap-y-4">
              <label
                className="cursor-pointer w-full justify-center items-center
                flex px-2 py-[0.1rem] border border-slate-600 rounded-lg text-blackFactory" htmlFor="file">
                Select Image
                <input className='hidden' type="file"
                       id="file" accept="image/*"
                       onChange={(e) => {
                         setImage(e.target.files[0])
                       }}/>
              </label>
              {image &&
                <div className={"flex flex-col gap-2"}>
                  <div className="">
                    <img className="md:w-[250px] object-contain"
                         src={URL.createObjectURL(image)} alt=""/>
                  </div>
                  <div className="flex gap-x-2 justify-between">
                    <button className="rounded-md md:text-base text-[14px] bg-redHover text-whiteFactory px-2 py-1"
                            onClick={(e) => setImage('')}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                           stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
                      </svg>
                    </button>
                    <label
                      className="text-center rounded-md md:text-base text-[14px] text-whiteFactory bg-blueBase px-2 py-1"
                      htmlFor="files">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                           stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"/>
                      </svg>
                    </label>
                  </div>
                </div>
              }
              {errors && <span className="text-red-600 text-sm mt-2">{errors.image}</span>}
            </div>
            <button
              onClick={(e) => {
                storeDonation()
              }}
              className="rounded-[20px] px-6 py-2 text-whiteFactory bg-redHover">Submit
            </button>
            {response && <span className="text-sm
          text-green-500">{response.data}</span>}
          </div>
        </div>
      </main>
    </>
  )
}
