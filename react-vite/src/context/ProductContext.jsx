import {createContext, useState, useEffect, useCallback} from "react";
import Axios from "axios";
import axios from "axios";
import {useQuery} from "@tanstack/react-query";

Axios.defaults.baseURL = import.meta.env.VITE_APP_URL;

const ProductContext = createContext();

export const ProductProvider = ({children}) => {
  const [reviews, setReviews] = useState([]);
  const [items, setItems] = useState([]);
  const [pageSum, setPageSum] = useState(1);
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState('')
  const [item, setItem] = useState({});
  const [errors, setErrors] = useState([]);
  const [types, setTypes] = useState([])
  const [formValues, setFormValues] = useState({
    name: "",
    price: "",
    qty: "",
    type: "",
    description: "",
    feature: "",
    status: "",
    image: "",
  })

  const {data: reviewsQuery, refetch: reviewsQueryReFetch} = useQuery(['reviews'], () => {
    return Axios.get('reviews').then((res) => {
      setReviews(res.data.data);
      return res.data.data;
    });
  });

  const fetchTypes = async () => {
    await Axios.get('getAllTypes').then(({data}) => {
      setTypes(data)
    }).catch((e) => {
      console.log(e)
    })
  }

  const {data: itemsQuery, refetch: itemsQueryReFetch, isLoading: itemsLoading} = useQuery(['itemsQuery'], () => {
      return Axios.get(`products`).then((res) => {
        setItems(res.data.data);
        return res.data.data
      });
    }
  );

  const {
    data: itemsPaginate,
    refetch: itemsPaginateReFetch,
    isLoading: itemsPageLoading
  } = useQuery(['itemsPaginate', page, searchInput], () => {
    if (searchInput !== '') {
      return Axios.get(`fetchItems/${searchInput}?page=${page}`).then((res) => {
        setPageSum(res.data.meta.last_page)
        return res.data.data;
      })
    }
    return Axios.get(`fetchItems?page=${page}`).then(res => {
      setPageSum(res.data.meta.last_page)
      return res.data.data;
    })
  }, {keepPreviousData: true})

  const getType = (type) => {
    setPage(1);
    switch (type) {
      case '':
        return 'All';
      case 'sensor':
        return 'Sensor';
      case 'microcontroller':
        return 'Micro-Controller';
      case 'microprocessor':
        return 'Micro-Processor';
      case 'tools':
        return 'Tools';
      case 'resistor':
        return 'Resistor';
      case 'electronic':
        return 'Electronic Component';
      case 'battery':
        return 'Battery';
      case 'arduino':
        return 'Arduino';
      case 'steam':
        return 'Steam';
      default:
        return type;
    }
  }

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
      feature: apiItem.feature,
      image: apiItem.image,
      status: apiItem.status,
    })
  };

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
      await itemsQueryReFetch()
      history.back()
    } catch (msg) {
      console.log(msg.response.data.errors);
      if (msg.response.status === 422) {
        setErrors(msg.response.data.errors)
        console.log(msg.response.data.errors)
      }
    }
  }

  const updateProduct = async (product) => {
    const stockItem = items.find((item) => item.id === product.product_id)
    stockItem.qty = stockItem.qty - product.qty;
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
      itemsPageLoading,
      itemsPaginateReFetch,
      itemsPaginate,
      fetchTypes,
      types,
      getType,
      itemsQuery,
      pageSum,
      setPageSum,
      page,
      setPage,
      itemsLoading,
      items,
      setItems,
      itemsQueryReFetch,
      item,
      setItem,
      formValues,
      setFormValues,
      errors,
      storeItem,
      getItem,
      onChange,
      updateItem,
      updateProduct,
      searchInput,
      setSearchInput,
      reviewsQueryReFetch,
      reviews
    }}>{children}</ProductContext.Provider>;
};

export default ProductContext;
