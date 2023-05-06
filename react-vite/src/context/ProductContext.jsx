import {useContext, createContext, useState, useEffect} from "react";
import Axios from "axios";

const ProductContext = createContext();
Axios.defaults.baseURL = "http://127.0.0.1:8000/api/v1/";

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

  useEffect(() => {
    // localStorage.removeItem('savedItem')
    setCartItem(JSON.parse(localStorage.getItem('savedItem')) ?? [])
  }, []);

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

  function saveLocal(itemSave) {
    // console.log(JSON.stringify(itemSave));
    localStorage.setItem('savedItem', JSON.stringify(itemSave));
  }

  const storeItem = (item) => {
    checkQty(item);
    // console.log(item)
    if (itemExist(item)) {
      item.qty = item.qty - 1;
      const tempItem = cartItem.find((i) => i.id === item.id);
      setCartItem([...cartItem, {qty: tempItem.qty = tempItem.qty + 1}]);
      // console.log(cartItem)
      saveLocal(cartItem);
    } else if (!itemExist(item)) {
      item.qty = item.qty - 1;
      setCartItem([...cartItem, {
        id: item.id,
        name: item.name,
        price: item.price,
        qty: 1,
        status: item.status,
      }]);
      saveLocal(cartItem);
    }
  };

  const increaseItemQty = (item) => {
    const tempItem = cartItem.find((i) => i.id === item);
    setCartItem([...cartItem, {qty: tempItem.qty = tempItem.qty + 1}]);
    saveLocal(cartItem);
  };
  const decreaseItemQty = (item) => {
    let tempItem = cartItem.find((i) => i.id === item);
    if (tempItem.qty > 1) {
      setCartItem([...cartItem, {qty: tempItem.qty = tempItem.qty - 1}]);
      saveLocal(cartItem);
    } else {
      setError("Item Quantity Cannot be less than 1")
      setTimeout(() => {
        setError("")
      }, 1500);
    }
  };


  return <ProductContext.Provider
    value={{
      items,
      item,
      getItems,
      getItem,
      cartItem,
      storeItem,
      error,
      setError,
      increaseItemQty,
      decreaseItemQty
    }}>{children}</ProductContext.Provider>;
};

export default ProductContext;
