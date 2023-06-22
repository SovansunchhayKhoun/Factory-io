import React, {useEffect, useState} from "react";
import { FilePond, registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
registerPlugin(FilePondPluginFileValidateType)

export const DonateContent = ({setModalOpen, modalOpen}) => {
  const [file, setFile] = useState(null);
  const options = [
    {value: '1', text: 'ABA - $$$'},
    {value: '2', text: 'ABA - KHR'},
  ];
  const [selected, setSelected] = useState(1);
  const handleChange = event => {
    setSelected(Number(event.target.value));
  };
  const handleFile = () => {

  }

  return (
    <>
      <section className="p-12 overflow-auto text-blackFactory rounded-md bg-whiteFactory shadow-2xl">
        <div
          className="flex flex-col gap-y-3 mx-auto items-center justify-center max-w-[500px] min-w-[300px] border-slate-600">
          <div className="flex justify-center items-center flex-row gap-x-2">
            <h1 className="font-bold text-2xl">Donate for Community Platform</h1>
            <button onClick={(e) => {
              e.stopPropagation();
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
              <img className={`object-contain
              md:w-[200px] md:h-[200px] md:mt-0 mt-2
              `} src="/assets/images/qr-dollars.jpg"
                   alt=""/>}

            {selected === 2 &&
              <img className={`object-contain
              md:w-[200px] md:h-[200px] md:mt-0 mt-2
              `} src="/assets/images/qr-riel.jpg"
                   alt=""/>}
          </div>
          <div className="flex flex-col w-2/3">
            <label htmlFor="comment">Comment</label>
            <input id="comment" className="border border-slate-600 rounded-md px-2 py-1"/>
          </div>
          <div className="flex flex-col w-2/3">
            <label htmlFor="upload">Upload Screenshot</label>
            <input type="file" id="upload" className="border border-slate-600 rounded-md px-2 py-1"/>

            {/*<FilePond*/}
            {/*  styleButtonRemoveItemAlign={false}*/}
            {/*  files={file}*/}
            {/*  server={{*/}
            {/*    process: "http://127.0.0.1:8000/api/v1/tmp-post",*/}
            {/*    revert: "http://127.0.0.1:8000/api/v1/tmp-delete",*/}
            {/*  }}*/}
            {/*  onupdatefiles={(e) => {*/}
            {/*    setFile(e)*/}
            {/*    handleFile(e[0].file)*/}
            {/*  }}*/}
            {/*  allowDrop={true}*/}
            {/*  allowMultiple={false}*/}
            {/*  acceptedFileTypes={['image/*']}*/}
            {/*/>*/}


          </div>
          <button className="rounded-[20px] px-6 py-2 text-whiteFactory bg-redHover">Submit</button>
        </div>
      </section>
    </>
  )
}
