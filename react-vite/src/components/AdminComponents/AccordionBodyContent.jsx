import React, {useContext, useEffect, useState} from "react";
import ProductContext from "../../context/ProductContext.jsx";
import InvoiceContext from "../../context/InvoiceContext.jsx";

export const AccordionBodyContent = (props) => {
  const {invProd, setInvProd} = props;
  const {id, date, totalPrice, status, address, invoice_product, user} = props.invoice;
  // const [invProd, setInvProd] = useState(invoice_product)
  const {items} = useContext(ProductContext);
  const {handleQty, editInvoiceProduct} = useContext(InvoiceContext);

  return (
    <div className="text-blackFactory font-semibold">
      <div className="px-6">
        <div className="flex justify-between mb-3">
          <div className="font-bold">Order ID: {id}</div>
          <div className="text-tealActive">
            {status === -1 && 'Pending'}
            {status === 1 && 'Accepted'}
            {status === 2 && 'Delivering'}
            {status === 3 && 'Arrived'}
          </div>
        </div>
        <div className="grid grid-cols-2 pr-12 gap-2 mb-3">
          <div>Order Date: {date}</div>
          <div>Phone Number: {user[0].phoneNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "-")}
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
                <div key={item.id}>
                  {item.products.map((product) => {
                    return <div key={product.id}>{product.name}</div>
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
                <div key={item.id}>
                  {item.products.map((product) => {
                    return <div key={product.id}>{product.type}</div>
                  })}
                </div>
              )
            })
          }</div>
        <div>Qty
          {invoice_product.map((item) => {
            const stockItem = items.find((i) => i.id === item.product_id);
            const inputStyle = 'border-none'
            return (
              <>
                <div key={item.id}>
                  <input onChange={handleQty(invProd, setInvProd, item)}
                         min="1"
                         className={`${stockItem?.qty > item.qty && inputStyle} p-0 text-center max-w-[36px]`}
                         disabled={stockItem?.qty > item.qty && true}
                         type="text"
                         placeholder={item.qty}/>
                  <span
                    className="text-redBase">{(item.qty > stockItem?.qty && status === -2) && ` Stock QTY: ${stockItem?.qty}`}</span>
                </div>
              </>
            );
          })}
          {/*<button onClick={() => {editInvoiceProduct(item)}} className={`${location.pathname === '/admin/orders/no-stock' || 'hidden'} border border-tealBase px-2`}>*/}
          {/*  Confirm Edit*/}
          {/*</button>*/}
        </div>
        <div>Price
          {
            invoice_product.map((item) => {
              return (
                <div key={item.id}>
                  {item.products.map((product) => {
                    return <div key={product.id}>${product.price}</div>
                  })}
                </div>
              )
            })
          }</div>
        <div>Sub-total
          {invoice_product.map((item) => <div key={item.id}>${item.cart_item_price}</div>)}
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
  )
    ;
}
