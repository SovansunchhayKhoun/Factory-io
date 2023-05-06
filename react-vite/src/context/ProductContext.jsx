import {useContext, createContext, useState, useEffect} from "react";
import Axios from "axios";

Axios.defaults.baseURL = "http://127.0.0.1:8000/api/v1/";

const ProductContext = createContext();

export const ProductProvider = ({children}) => {
  const [items, setItems] = useState([]);
  const [item, setItem] = useState({});
  const [error, setError] = useState("");
  const [cartItem, setCartItem] = useState([]);

  const getItems = async () => {
    const apiItems = await Axios.get("products");
    setItems(apiItems.data.data);
  };

  const getItem = async (id) => {
    const apiItem = await Axios.get(`products/${id}`);
    setItem(apiItem.data.data);
  };

  function checkQty(item) {
    if (item.qty === 0) {
      setError('Item is out of stock');
      setTimeout(() => {
        setError('');
      }, 1500)
    }
  }

  function itemExist(item) {
    // console.log(item)
    for (let i = 0; i < cartItem.length; i++) {
      if (cartItem[i].id === item.id) {
        return true;
      }
    }
    return false;
  }

  function saveLocalCartItem(itemSave) {
    // console.log(JSON.stringify(itemSave));
    localStorage.setItem('savedItem', JSON.stringify(itemSave));
  }

  const storeItem = (item) => {
    checkQty(item);
    if (itemExist(item)) {
      item.qty = item.qty - 1;
      setItem({...item});
      // find and update that existed item qty
      cartItem.find((i) => i.id === item.id).qty = cartItem.find((i) => i.id === item.id).qty + 1;
      setCartItem([...cartItem]);
      // saveLocalCartItem(cartItem);
    } else if (!itemExist(item)) {
      item.qty = item.qty - 1;
      setItem({...item});
      setCartItem([...cartItem, {
        id: item.id,
        name: item.name,
        price: item.price,
        qty: 1,
        status: item.status,
      }]);
      // saveLocalCartItem(cartItem);
    }
  };

  const increaseItemQty = (cart) => {
    // find original item
    const stockItem = items.find((i) => i.id === cart.id);
    stockItem.qty = stockItem.qty - 1;
    setItems([...items]);
    if (stockItem.qty >= 0) {
      cartItem.find((i) => i.id === cart.id).qty = cartItem.find((i) => i.id === cart.id).qty + 1;
      setCartItem([...cartItem]);
    } else {
      setError('Item Quantity cannot exceed stock quantity')
    }
    // saveLocalCartItem(cartItem);
  };
  const decreaseItemQty = (cart) => {
    cartItem.find((i) => i.id === cart.id).qty = cartItem.find((i) => i.id === cart.id).qty - 1;
    if (cartItem.find((i) => i.id === cart.id).qty > 1) {
      setCartItem([...cartItem]);
      // saveLocalCartItem(cartItem);
    } else {
      setError("Item Quantity Cannot be less than 1")
      setTimeout(() => {
        setError("")
      }, 1500);
    }
  };

  useEffect(() => {

  }, []);

  const getCartItem = () => {
    setCartItem(JSON.parse(localStorage.getItem('savedItem')) ?? []);
  };

  return <ProductContext.Provider
    value={{
      items,
      item,
      getItems,
      getItem,
      cartItem,
      storeItem,
      getCartItem,
      error,
      setError,
      increaseItemQty,
      decreaseItemQty
    }}>{children}</ProductContext.Provider>;
};

export default ProductContext;
