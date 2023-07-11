import {AcceptOrderButton} from "../ui/AcceptOrderButton.jsx";
import {DeclineOrderButton} from "../ui/DeclineOrderButton.jsx";
import React, {useState} from "react";
import {useAuthContext} from "../../context/AuthContext.jsx";
import {ImageExpand} from "../ImageExpand.jsx";

const imgUrl = import.meta.env.VITE_APP_URL;
export const AccordionHeaderContent = (props) => {
  const {invProd, setInvProd} = props;
  const {id, date, totalPrice, status, payment_pic} = props.invoice;
  const {user} = useAuthContext();
  const [open, setOpen] = useState(false);
  const handleOpen = (event) => {
    event.stopPropagation();
    setOpen(!open);
  }
  const buttonStyle = (invoiceStatus) => {
    switch (invoiceStatus) {
      case -2:
        return 'bg-orange-400 hover:bg-orange-500';
      case -1:
        return 'bg-blue-400 hover:bg-blue-500';
      case 1:
        return 'bg-green-400 hover:bg-green-500';
      case 2:
        return 'bg-blueBase hover:bg-blueHover';
      case 3:
        return 'bg-tealBase hover:tealHover';
      default:
        return 'bg-purple-400 hover:bg-purple-500'
    }
  }

  return (
    <div className="md:text-base text-[10px] px-3 flex w-full justify-between items-center">
      <div className="font-semibold flex flex-col">
        <div>
          Order ID: {id}
        </div>
        <div>
          Order Date: <span className="font-normal">{date}</span>
        </div>
        <div className="text-tealBase">
          {status === -1 && 'Pending'}
          {status === 1 && 'Accepted'}
          {status === 2 && 'Delivering'}
          {status === 3 && 'Arrived'}
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div>
          Total Price: <span className="font-bold text-blueBase">${totalPrice}</span>
        </div>
        <div onClick={e => handleOpen(e)}>
          <img width={100} alt="" src={`${imgUrl}/${payment_pic}`}/>
          <ImageExpand open={open} setOpen={setOpen} imgSrc={`${imgUrl}/${payment_pic}`}/>
        </div>
        <div className={`${user.acc_type !== 0 && "hidden"} flex text-whiteFactory gap-x-2 mt-1`}>
            <AcceptOrderButton buttonStyle={buttonStyle} invProd={invProd} setInvProd={setInvProd} invoice={props.invoice}/>
            <DeclineOrderButton invProd={invProd} setInvProd={setInvProd} invoice={props.invoice}/>
        </div>
      </div>
    </div>
  );
}
