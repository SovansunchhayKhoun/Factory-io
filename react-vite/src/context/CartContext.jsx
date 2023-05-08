import {createContext, useContext, useState} from "react";
import ProductContext from "./ProductContext.jsx";
import Axios from "axios";
import {useNavigate} from "react-router-dom";
Axios.defaults.baseURL = "http://127.0.0.1:8000/api/v1/";

const CartContext = createContext();
export const CartProvider = ({children}) => {
  const {getItems, items, setItems, setItem} = useContext(ProductContext);
  const [cartItem, setCartItem] = useState([]);
  const [error, setError] = useState(false);
  const totalPrice = cartItem.reduce((total, i) => total+=i.price*i.qty,0);
  function storeItem (item)  {
    if (itemExist(item)) {
      // find and update that existed item qty
      const itemCart = cartItem.find((i) => i.id === item.id);
      itemCart.qty = itemCart.qty + 1;
      itemCart.cart_item_price = itemCart.cart_item_price * itemCart.qty;
      setCartItem([...cartItem]);
    } else if (!itemExist(item)) {
      setCartItem([...cartItem, {
        id: item.id,
        name: item.name,
        price: item.price,
        qty: 1,
        status: item.status,
        errorStatus: false,
        cart_item_price: item.price * 1,
      }]);
    }
    saveLocalCartItem(cartItem);
  }
  const checkQty = (item) => {
    if(item.qty) {
      item.qty = item.qty - 1;
      storeItem(item);
    }
  }

  function itemExist(item) {
    for (let i = 0; i < cartItem.length; i++) {
      if (cartItem[i].id === item.id) {
        return true;
      }
    }
    return false;
  }

  const saveLocalCartItem = (itemSave) => {
    localStorage.setItem('CART_ITEM', JSON.stringify(itemSave ?? []));
  }

  const increaseItemQty = (cart) => {
    // find original item
    const stockItem = items.find((i) => i.id === cart.id);
    // set variable for cart item
    const item = cartItem.find((i) => i.id === cart.id);
    if (item.qty < stockItem.qty) {
      item.qty = item.qty + 1;
      item.cart_item_price = item.cart_item_price * item.qty;
      setCartItem([...cartItem]);
      saveLocalCartItem(cartItem);
    } else {
      item.errorStatus = "Item quantity cannot exceed stock quantity";
      setCartItem([...cartItem]);
      setTimeout(() => {
        item.errorStatus = "";
        setCartItem([...cartItem]);
      }, 1500);
    }
  };
  const decreaseItemQty = (cart) => {
    // set variable for cart item
    const item = cartItem.find((i) => i.id === cart.id);
    item.qty > 0 ? item.qty = item.qty - 1 : cartItem.splice(cartItem.indexOf(item), 1);

    item.cart_item_price = item.cart_item_price * item.qty;

    setCartItem([...cartItem]);
    saveLocalCartItem(cartItem);
  };

  const getCartItem = () => {
    setCartItem(JSON.parse(localStorage.getItem('CART_ITEM')) ?? []);
  };

  const checkOut = async (e) => {
    e.preventDefault();
    try{
      await Axios.post('products', cartItem);
      getItems();
    } catch (e){
      if(e.response.status = 422){
        console.log(e.response.data.errors);
      }
    }
  }

  return <CartContext.Provider value={{
    cartItem,
    setCartItem,
    error,
    setError,
    checkQty,
    checkOut,
    getCartItem,
    saveLocalCartItem,
    increaseItemQty,
    totalPrice,
    decreaseItemQty
  }}>
    {children}</CartContext.Provider>;
};

export default CartContext;
