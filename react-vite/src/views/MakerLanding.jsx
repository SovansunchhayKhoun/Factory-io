import {Link} from "react-router-dom";
import {ItemCard} from "../components/ItemCard.jsx";
import {useNavigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import ProductContext from "../context/ProductContext.jsx";

export const MakerLanding = () => {
  let navigate = useNavigate();
  const {items, getItems} = useContext(ProductContext);
  useEffect(() => {
    getItems();
  }, []);

  return (
    <main className="">
      <button onClick={() => {
        localStorage.removeItem('CART_ITEM');
        document.location.reload(true);
      }}>Clear Local Storage</button>

      <div className="flex flex-col items-center gap-y-6">
        <section className="font-bold">
          Product
        </section>
        <div className="w-[384px]">
          <input type="text"
                 className="w-[100%] px-12 search-bar py-2"/>
        </div>
        <div className="flex gap-x-6 font-bold mb-6">
          <div className="highlight-hover">All</div>
          <div className="highlight-hover">Sensors</div>
          <div className="highlight-hover">Micro-Controller</div>
          <div className="highlight-hover">Arduino</div>
          <div className="highlight-hover">Steam</div>
        </div>
      </div>

      {/*display item */}
      <div className="flex justify-center px-24">
        <div className="items-display gap-6">
          {/*warning if no items in database*/}
          {items.length === 0 && <div>No Items</div>}
          {/*warning if no items in database*/}
          {items.map((item, key) => {
            return (
              <ItemCard key={item.id} item={item} />
            );
          })}
        </div>
      </div>
    </main>
  );
};


