import {createContext, useState, useEffect} from "react";
import Axios from "axios";

Axios.defaults.baseURL = "http://127.0.0.1:8000/api/v1/";

const ProductContext = createContext();

export const ProductProvider = ({children}) => {
  const [items, setItems] = useState([]);
  const [item, setItem] = useState({});
  const getItems = async () => {
    const apiItems = await Axios.get("products");
    setItems(apiItems.data.data);
  };

  const getItem = async (id) => {
    const apiItem = await Axios.get(`products/${id}`);
    setItem(apiItem.data.data);
  };

  return <ProductContext.Provider
    value={{
      items,
      item,
      getItems,
      getItem,
    }}>{children}</ProductContext.Provider>;
};

export default ProductContext;
