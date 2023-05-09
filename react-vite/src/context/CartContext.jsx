import {createContext, useContext, useEffect, useState} from "react";
import ProductContext from "./ProductContext.jsx";
import Axios from "axios";
import InvoiceContext from "./InvoiceContext.jsx";
import invoiceContext from "./InvoiceContext.jsx";

Axios.defaults.baseURL = "http://127.0.0.1:8000/api/v1/";

const CartContext = createContext();
export const CartProvider = ({children}) => {
  const {items, setItem} = useContext(ProductContext);
  const {invoices} = useContext(InvoiceContext);
  const [cartItem, setCartItem] = useState([]);
  const [error, setError] = useState("");
  const totalPrice = cartItem.reduce((total, i) => total += i.price * i.qty, 0);

  let latestInvoice = invoices.slice(-1)[0]?.id + 1 || 1;
  const storeItem = (item) => {
    if (itemExist(item)) {
      // find and update that existed item qty
      const itemCart = cartItem.find((i) => i.id === item.id);
      itemCart.qty = itemCart.qty + 1;
      itemCart.cart_item_price = itemCart.cart_item_price * itemCart.qty;
      setCartItem([...cartItem]);
    } else if (!itemExist(item)) {

      setCartItem([...cartItem, {
        invoice_id: latestInvoice,
        id: item.id, // referenced from stock items
        product_id: item.id, //for cart product database
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

  const addToCart = (item, currentQty) => {
    currentQty = currentQty-1;
    if (item.qty && currentQty >= 0) {
      storeItem(item);
      // if item doesnt exist in cart, save item
      !cartItem.find((i) => item.id === i.product_id) && saveLocalCartItem([...cartItem, ({
        ...item,
        invoice_id: latestInvoice,
        product_id: item.id,
        qty: 1,
        cart_item_price: item.price * 1,
      })])
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
    item.qty > 1 ? item.qty = item.qty - 1 : cartItem.splice(cartItem.indexOf(item), 1);

    item.cart_item_price = item.cart_item_price * item.qty;

    setCartItem([...cartItem]);
    saveLocalCartItem(cartItem);
  };

  const getCartItem = () => {
    setCartItem(JSON.parse(localStorage.getItem('CART_ITEM')) ?? []);
  };

  function clearCart() {
    localStorage.removeItem('CART_ITEM');
    document.location.reload(true);
  }

  const checkOut = async (item) => {
    try {
      await Axios.post('invoice_products', item);
      setError('Check Out Successful')
      setTimeout(() => {
        setError('');
      }, 1500);
      clearCart();
    } catch (e) {
      if (e.response.status = 422) {
        setError("Cannot Checkout");
      }
    }
  }


  return <CartContext.Provider value={{
    cartItem,
    setCartItem,
    error,
    setError,
    addToCart,
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
