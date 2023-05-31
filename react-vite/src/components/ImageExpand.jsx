import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Card} from "flowbite-react";
import React, {useContext, useEffect, useState} from "react";
import ChatContext from "../context/ChatContext.jsx";

export const ImageExpand = ({open, setOpen,content}) => {
  // close on click outside
  useEffect(() => {
    const clickHandler = (event) => {
      if (!open) return
        setOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 70 + "%",
  };

  return (
    <>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="div" id="modal-modal-description" sx={{mt: 2}}>
            <div className="flex justify-center">
              <img src={content} alt=""/>
            </div>
          </Typography>
        </Box>
      </Modal>
    </>
  );
};
