import {createContext, useState, useEffect} from "react";
import Axios from "axios";


Axios.defaults.baseURL = import.meta.env.VITE_APP_URL;

const ProductContext = createContext();

export const ProductProvider = ({children}) => {
  const [items, setItems] = useState([]);
  const [item, setItem] = useState({});
  const [formValues, setFormValues] = useState({
    name: "",
    price: "",
    qty: "",
    type: "",
    description: "",
    image: "",
  })
  const [errors, setErrors] = useState([]);
  const getItems = async () => {
    const apiItems = await Axios.get("products");
    setItems(apiItems.data.data);
  };

  const storeItem = async (e) => {
    try {
      await Axios.post("products", formValues)
      location.reload()
    } catch (e) {
      if (e.response.status === 422) {
        setErrors(e.response.data.errors)
      }
    }
  }
  const onChange = (e) => {
    const {name, value} = e.target
    setFormValues({...formValues, [name]: value})
  }

  const getItem = async (id) => {
    const response = await Axios.get(`products/${id}`)
    const apiItem = response.data.data
    setItem(apiItem);
    setFormValues({
      name: apiItem.name,
      qty: apiItem.qty,
      type: apiItem.type,
      price: apiItem.price,
      description: apiItem.description,
      image: apiItem.image,
      status: apiItem.status,
    })
  };

  const resetFormValues = () => {
    setFormValues({
      name: "",
      qty: "",
      type: "",
      price: "",
      description: "",
      image: "",
    })
  }

  const updateItem = async (e) => {
    e.preventDefault()

    formValues.qty > 0 ? formValues.status = 1 : formValues.status = 0;

    try {
      await Axios.put("products/" + item.id, formValues)
      resetFormValues()
      history.back()
    } catch (msg) {
      console.log(msg.response.data.errors);
      if (msg.response.status === 422) {
        setErrors(msg.response.data.errors)
      }
    }
  }

  const updateProduct = async (cartItem) => {
    const stockItem = items.find((item) => item.id === cartItem.product_id)
    stockItem.qty = stockItem.qty - cartItem.qty;
    if(stockItem.qty === 0) {
      stockItem.status = 0;
    }

    try {
      await Axios.put("products/" + stockItem.id, stockItem);
    } catch (msg) {
      console.log(msg.response.data.errors);
      setErrors(msg.response.data.errors);
    }
  }

  return <ProductContext.Provider
    value={{
      items,
      item,
      formValues,
      setFormValues,
      errors,
      storeItem,
      getItems,
      getItem,
      onChange,
      updateItem,
      updateProduct
    }}>{children}</ProductContext.Provider>;
};

export default ProductContext;
