import {useContext} from "react";
import ProductContext from "../../context/ProductContext.jsx";

export const AddCartButton = (props) => {
  const {storeItem} = useContext(ProductContext);
    return (
        <>
          <button onClick={() => storeItem(props.item)}>
            <img width="36" src="/assets/images/cart-icon.png" alt=""/>
          </button>
        </>
    );
};
