import {Link, useNavigate, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import ProductContext from "../../context/ProductContext.jsx";
import CartContext from "../../context/CartContext.jsx";
import InvoiceContext from "../../context/InvoiceContext.jsx";

export const ItemView = (props) => {
  let {id} = useParams();
  const {item, getItem} = useContext(ProductContext);
  const {checkQty, cartItem, saveLocalCartItem} = useContext(CartContext);
  const {invoices} = useContext(InvoiceContext);
  let latestInvoice = invoices.slice(-1)[0]?.id + 1 || 1;

  useEffect(() => {
    getItem(id);
  }, []);

  const [addItem, setAddItem] = useState("");
  let navigate = useNavigate();
  return (
    <main className="px-36">
      <div className="w-[50%] flex items-center justify-between">
        <button onClick={() => {
          navigate(-1)
        }}>
          <img width="24" src="/assets/images/arrow-left.png" alt=""/>
        </button>
        <span className="font-bold text-xl">Product</span>
      </div>
      <section className="mt-12 flex justify-center">
        <img className="mr-12 border-2 border-tealBase p-4 bg-factoryWhite w-[350px] h-[350px] object-cover"
             src="/assets/images/item1.png" alt=""/>
        <div className="w-[50%] text-lg shadow-2xl rounded-xl p-4">
          <div className="mb-2 font-bold text-blueBase">${item.price}</div>
          <div className="mb-2 font-bold text-tealBase">{item.name}</div>
          <div className="mb-2 text-blackFactory">Item Type: {item.type}</div>
          <div className="mb-2 text-redBase font-bold">{item.status}</div>
          <div className="mb-2 text-blackFactory">
            Description
            <p className="mb-3">
              {item.description}
            </p>
          </div>
          <div className="flex justify-end items-center">
            <p className="text-tealHover font-bold text-sm">
              {addItem}
            </p>
            <button onClick={() => {
              checkQty(item);

              !cartItem.find((i) => item.id === i.product_id) && saveLocalCartItem([...cartItem, ({
                ...item,
                invoice_id: latestInvoice,
                product_id: item.id,
                qty: 1,
                cart_item_price: item.price*1,
              })])

              setAddItem("Item has been added to cart");
              setTimeout(() => {
                setAddItem("")
              }, 3000);
            }}>
              <img src="/assets/images/cart-icon.png" alt=""/>
            </button>
            {/*<AddCartButton item={item}/>*/}
          </div>
        </div>
      </section>
    </main>
  );
};
