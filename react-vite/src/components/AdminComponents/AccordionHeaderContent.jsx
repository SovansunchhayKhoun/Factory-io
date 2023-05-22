import {AcceptOrderButton} from "../ui/AcceptOrderButton.jsx";
import {DeclineOrderButton} from "../ui/DeclineOrderButton.jsx";
import React from "react";
import {useAuthContext} from "../../context/AuthContext.jsx";

export const AccordionHeaderContent = (props) => {
  const {invProd, setInvProd} = props;
  const {id, date, totalPrice, status, noStock,payment_pic} = props.invoice;
  const {user} = useAuthContext();
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
    <div className="flex w-full justify-between items-center">
      <div className="font-semibold flex flex-col">
        <div>
          Order ID: {id}
        </div>
        <div>
          Order Date: {date}
        </div>
        <div className="text-tealBase">
          {status === -1 && 'Pending'}
          {status === 1 && 'Accepted'}
          {status === 2 && 'Delivering'}
          {status === 3 && 'Arrived'}
        </div>
      </div>
      <div className="flex flex-col">
        <div className="text-xs text-redBase">
          {/**Insufficient Product Quantity*/}
          {noStock && 'Some of the products are out of stock'}
        </div>
        <div>
          Total Price: <span className="font-bold text-blueBase">${totalPrice}</span>
        </div>
        <div>
          <img width={100} src={`http://127.0.0.1:8000/${payment_pic}`}/>
        </div>
        <div className={`${user.acc_type !== 0 && "hidden"} flex text-whiteFactory gap-x-2 mt-1`}>
          <AcceptOrderButton buttonStyle={buttonStyle} invProd={invProd} setInvProd={setInvProd} invoice={props.invoice}/>
          <DeclineOrderButton invProd={invProd} setInvProd={setInvProd} invoice={props.invoice}/>
        </div>
      </div>
    </div>
  );
}
