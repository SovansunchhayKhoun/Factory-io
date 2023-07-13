import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Card} from "flowbite-react";
import React, {useContext, useEffect, useState} from "react";
import ChatContext from "../context/ChatContext.jsx";

// export const ImagePreview = ({
//                                messageImage,
//                                sendMessage,
//                                messageInput,
//                                setMessageInput,
//                                receiver,
//                                sender,
//                                open,
//                                setOpen,
//                                handleMessage
//                              }) => {
export const ImagePreview = ({
                               receiver,
                               sender,
                               open,
                               setOpen,
                             }) => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    p: 2,
  };
  const {
    loadingSend,
    messageImage,
    sendMessage,
    setMessageInput,
    messageInput,
    handleMessage,
    clearMessage,
    setLoadingSend
  } = useContext(ChatContext);
  return (
    <>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="md:w-[450px] w-[250px]">
            <Typography id="modal-modal-title" variant="div" component="h2">
              <div className={"flex justify-between"}>
                <div>Send an Image</div>
                <button className="transition duration-300 rounded-[50%] hover:bg-grayFactory" onClick={event => {
                  event.stopPropagation();
                  setOpen(false);
                  clearMessage();
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                       stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>
            </Typography>
            <Typography variant="div" id="modal-modal-description" sx={{mt: 2}}>
              {messageImage &&
                <Card>
                  <img className="max-h-96 object-contain bg-[#D9D9D9]" src={URL.createObjectURL(messageImage)} alt=""/>
                  <div className="flex gap-x-2 font-normal text-gray-700 dark:text-gray-400">
                    <input
                      value={messageInput}
                      autoFocus
                      disabled={loadingSend || false}
                      className="w-full flex items-center h-10 rounded px-3 text-sm"
                      onKeyDown={event => {
                        if (event.key === 'Enter') {
                          sendMessage(sender, receiver).then(() => {
                            setOpen(false);
                            setLoadingSend(false);
                          });
                        }
                        if (event.key === 'Escape') {
                          setOpen(false);
                          clearMessage();
                        }
                      }}
                      onChange={event => handleMessage(event, setMessageInput)} type="text"/>
                    <button disabled={loadingSend || false} onClick={() => {
                      sendMessage(sender, receiver).then(() => {
                        setOpen(false);
                        setLoadingSend(false);
                      });
                    }}
                            className={`${loadingSend ? 'bg-opacity-60' : 'hover:bg-blue-700'} bg-[#1C64F2] text-whiteFactory font-semibold rounded-md px-3 py-1 flex items-center cursor-pointer`}>
                      {loadingSend ? <span>sending...</span> : <span>send</span>}
                    </button>
                  </div>
                </Card>
              }
            </Typography>
          </div>
        </Box>
      </Modal>
    </>
  );
};
