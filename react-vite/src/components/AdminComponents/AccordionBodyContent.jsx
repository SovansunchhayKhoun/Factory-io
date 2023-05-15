import React, {useContext} from "react";
import ProductContext from "../../context/ProductContext.jsx";

export const AccordionBodyContent = (props) => {
  const {id, date, totalPrice, status, address, invoice_product, user, noStock} = props.invoice;
  const {items} = useContext(ProductContext);

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
                <div key={item.product_id}>
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
                <div key={item.product_id}>
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
            return (
              <>
                {/*<input disabled={(item.qty <= stockItem?.qty)} className={`${(item.qty >= stockItem?.qty) && 'border border-blackFactory '} text-center w-[50px]`} placeholder={item.qty}/>*/}
                <div>{item.qty}
                  <span className="text-redBase">{(item.qty > stockItem?.qty && status === -2) && ` Stock QTY: ${stockItem.qty}`}</span>
                </div>
                {/*</input>*/}
              </>
            )
          })}
        </div>
        <div>Price
          {
            invoice_product.map((item) => {
              return (
                <div key={item.product_id}>
                  {item.products.map((product) => {
                    return <div key={product.id}>${product.price}</div>
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
