import {createContext, useState, useEffect, useCallback} from "react";
import Axios from "axios";
import axios from "axios";
import {useQuery} from "@tanstack/react-query";


Axios.defaults.baseURL = import.meta.env.VITE_APP_URL;

const ProductContext = createContext();

export const ProductProvider = ({children}) => {
  const [items, setItems] = useState([]);
  const [item, setItem] = useState({});
  const [searchInput, setSearchInput] = useState('')
  const {data: itemsQuery, refetch: itemsQueryReFetch, isLoading: itemsLoading} = useQuery(['items'], () => {
    return Axios.get('products').then((res) => {
      setItems(res.data.data);
      return res.data.data
    });
  });

  const [formValues, setFormValues] = useState({
    name: "",
    price: "",
    qty: "",
    type: "",
    description: "",
    status: "",
    image: "",
  })

  const [errors, setErrors] = useState([]);
  // const getItems = useCallback(async () => {
  //   const apiItems = await Axios.get("products");
  //   setItems(apiItems.data.data);
  //   console.log('mount product')
  // }, []);

  const getItem = async (id) => {
    const response = await Axios.get(`products/${id}`)
    const apiItem = response.data.data;
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

  // const getItems = async () => {
  //   const apiItems = await Axios.get("products");
  //   setItems(apiItems.data.data);
  //   console.log('mount')
  // };

  const storeItem = async (formValues) => {
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

  const resetFormValues = () => {
    setFormValues({
      name: "",
      qty: "",
      type: "",
      price: "",
      description: "",
      image: "",
      status: "",
    })
  }

  const updateItem = async (formData) => {
    try {
      await Axios.post("http://127.0.0.1:8000/api/v1/products/" + item.id, formData, {
        headers: {'Content-Type': "multipart/form-data"},
      });
      resetFormValues()
      history.back()
    } catch (msg) {
      console.log(msg.response.data.errors);
      if (msg.response.status === 422) {
        setErrors(msg.response.data.errors)
        console.log(msg.response.data.errors)
      }
    }
  }

  const updateProduct = async (cartItem) => {
    const stockItem = items.find((item) => item.id === cartItem.product_id)
    stockItem.qty = stockItem.qty - cartItem.qty;
    if (stockItem.qty === 0) {
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
      itemsLoading,
      items,
      itemsQueryReFetch,
      item,
      formValues,
      setFormValues,
      errors,
      storeItem,
      // getItems,
      getItem,
      onChange,
      updateItem,
      updateProduct,
      searchInput,
      setSearchInput
    }}>{children}</ProductContext.Provider>;
};

export default ProductContext;
