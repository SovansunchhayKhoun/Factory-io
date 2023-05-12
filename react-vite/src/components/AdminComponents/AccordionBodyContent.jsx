import React from "react";

export const AccordionBodyContent = (props) => {
  const {id, date, totalPrice, status, address, invoice_product, user} = props.invoice;
  return (
    <div className="text-blackFactory font-semibold">
      <div className="px-6">
        <div className="flex justify-between mb-3">
          <div className="font-bold">Order ID: {id}</div>
          <div className="text-tealActive">{status === 0 ? 'Pending' : 'Arrived'}</div>
        </div>
        <div className="grid grid-cols-2 pr-12 gap-2 mb-3">
          <div>Order Date: {date}</div>
          <div>Phone Number: {user[0].phoneNumber}
          </div>
          <div>Username: {user[0].username}
          </div>
          <div className={`bg-[#D9D9D9] px-2 py-1 rounded-lg`}>Address: {address}</div>
        </div>
      </div>
      <div className={`accordion-item-body mb-3`}>
        <div>Item
          {
            invoice_product.map((item) => {
              return (
                <div>
                  {item.products.map((product) => {
                    return <div>{product.name}</div>
                  })}
                </div>
              )
            })
          }
        </div>

        <div>Type
          {
            invoice_product.map((item) => {
              return (
                <div>
                  {item.products.map((product) => {
                    return <div>{product.type}</div>
                  })}
                </div>
              )
            })
          }</div>
        <div>Qty
          {invoice_product.map((item) => <div>{item.qty}</div>)}
        </div>
        <div>Price
          {
            invoice_product.map((item) => {
              return (
                <div>
                  {item.products.map((product) => {
                    return <div>${product.price}</div>
                  })}
                </div>
              )
            })
          }</div>
        <div>Sub-total
          {invoice_product.map((item) => <div>${item.cart_item_price}</div>)}
        </div>
      </div>
      <hr className="border-b-1 border-blackFactory rounded-lg"/>
      <div className={`accordion-item-body`}>
        <div>Grand Total</div>
        <div></div>
        {/* for Grid*/}
        <div></div>
        {/* for Grid*/}
        <div></div>
        {/* for Grid*/}
        <div>${totalPrice}</div>
      </div>
    </div>
  );
}
