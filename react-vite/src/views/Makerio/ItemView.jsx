import {Link, useNavigate, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import ProductContext from "../../context/ProductContext.jsx";
import CartContext from "../../context/CartContext.jsx";
import InvoiceContext from "../../context/InvoiceContext.jsx";

export const ItemView = (props) => {
  let {id} = useParams();
  const {item, getItem} = useContext(ProductContext);
  const {addToCart, cartItem} = useContext(CartContext);

  useEffect(() => {
    getItem(id);
  }, []);

  const itemCart = cartItem.find((i) => i.id === item.id);
  const currentQty = item.qty - (itemCart?.qty || 0);

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
      <section className="mt-12 flex justify-center gap-x-12">
        <div className="flex items-center border-2 border-tealBase p-4">
          <img className="max-w-[350px] max-h-[350px] min-w-[350px] min-h-[350px] object-contain"
               src={`/assets/images/${item?.picture ?? 'makerio.png'}`} alt={`${item.name}`}/>
        </div>
        <div className="text-lg shadow-2xl rounded-xl p-4">
          <div className="mb-2 font-bold text-blueBase">${item.price}</div>
          <div className="mb-2 font-bold text-tealBase">{item.name}</div>
          <div className="mb-2 text-blackFactory">Item Type: <span className={`font-semibold`}> {item.type}</span></div>
          <div className="mb-2 text-redBase font-bold">{currentQty === 0 ? "Out of Stock" : "In stock"}</div>
          <div className="mb-2 text-blackFactory">
            {/*Description*/}
            <p dangerouslySetInnerHTML={{__html: item.description}} className="mb-3"/>

          </div>
          <div className="flex justify-end items-center">
            <button className="rounded-[50%] px-1 py-1 hover:bg-tealActive active:bg-tealBase transition duration-300"
                    onClick={() => {
                      addToCart(item, currentQty);
                    }}>
              <img src="/assets/images/cart-icon.png" alt=""/>
            </button>
          </div>
        </div>
      </section>

    </main>
  );
};
