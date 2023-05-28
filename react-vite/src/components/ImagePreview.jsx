import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Card} from "flowbite-react";
import React, {useContext, useEffect, useState} from "react";
import ChatContext from "../context/ChatContext.jsx";

export const ImagePreview = ({
                               messageImage,
                               sendMessage,
                               messageInput,
                               setMessageInput,
                               receiver,
                               sender,
                               open,
                               setOpen,
                               handleMessage
                             }) => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    p: 4,
  };
  const {setMessagePost, clearMessage} = useContext(ChatContext);
  return (
    <>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Send an Image
          </Typography>
          <Typography variant="div" id="modal-modal-description" sx={{mt: 2}}>
            {messageImage &&
              <Card imgSrc={URL.createObjectURL(messageImage)}>
                <div className="flex gap-x-2 font-normal text-gray-700 dark:text-gray-400">
                  <input
                    value={messageInput}
                    autoFocus
                    className="w-full flex items-center h-10 rounded px-3 text-sm"
                    onKeyDown={event => {
                      if (event.key === 'Enter') {
                        sendMessage(sender, receiver, setMessageInput);
                        setOpen(false);
                      }
                      if (event.key === 'Escape') {
                        setOpen(false);
                        clearMessage(setMessageInput);
                      }
                    }}
                    onChange={event => handleMessage(event, setMessageInput)} type="text"/>
                  <button onClick={() => {
                    sendMessage(sender, receiver, setMessageInput);
                    setOpen(false);
                  }}
                          className="bg-[#1C64F2] text-whiteFactory font-semibold rounded-md px-3 py-1 flex items-center hover:bg-blue-700 cursor-pointer">
                    send
                  </button>
                </div>
              </Card>
            }
          </Typography>
        </Box>
      </Modal>
    </>
  );
};
