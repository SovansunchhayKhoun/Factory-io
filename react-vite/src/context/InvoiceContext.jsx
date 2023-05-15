import {createContext, useContext, useEffect, useState} from "react";
import Axios from "axios";
import {useQuery} from "@tanstack/react-query";
import {useAuthContext} from "./AuthContext.jsx";
import InvoiceProductContext from "./InvoiceProductContext.jsx";
import ProductContext from "./ProductContext.jsx";
import CartContext from "./CartContext.jsx";
import {useParams} from "react-router-dom";

Axios.defaults.baseURL = import.meta.env.VITE_APP_URL;

const InvoiceContext = createContext();
export const InvoiceProvider = ({children}) => {
  const {data: invoices, isLoading, refetch: invoicesReFetch} = useQuery(['invoices'], () => {
    return Axios.get('invoices').then((res) => {
      return res.data.data;
    })
  });
  const [invoice, setInvoice] = useState({});
  const getInvoice = async (id) => {
    const apiItem = await Axios.get(`invoices/${id}`);
    setInvoice(apiItem.data.data);
  };
  const {user} = useAuthContext();
  const [invoiceError, setInvoiceError] = useState([]);
  const [address, setAddress] = useState('');
  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  }

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  const storeInvoice = async (total, cartItem, checkOut, setLoading) => {
    const tempDate = new Date();
    const currentDate = tempDate.getFullYear() + '-' + (tempDate.getMonth() + 1) + '-' + tempDate.getDate() + ' ' + tempDate.getHours() + ':' + tempDate.getMinutes() + ':' + tempDate.getSeconds();
    const invoice = {
      user_id: user.id,
      date: currentDate,
      status: -1,
      address: address,
      totalPrice: total,
      payment_pic: 'No pic',
      item_count: cartItem.length,
    };

    try {
      await Axios.post('invoices', invoice);
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        cartItem.forEach((item) => {
          checkOut(item);
        });
      }, 3000);
    } catch (e) {
      scrollTop();
      console.log(e.response.data.errors);
      setInvoiceError(e.response.data.errors);
      setTimeout(() => {
        setInvoiceError(['']);
      }, 3000);
    }
  }

  const {data: items} = useQuery(['items'], () => {
    return Axios.get('products').then((res) => res.data.data);
  });

  const acceptOrder = async (order) => {
    const {invoice_product} = order;
    const tempArr = [];

    if(order.status <= 1) {
      invoice_product.forEach((inv_prod) => {
        const stockItem = items.find((item) => item.id === inv_prod.product_id);
        stockItem.qty = stockItem.qty - inv_prod.qty;
        if (stockItem.qty < 0) {
          order.status = -2;
          order.noStock = true;
        }
      })
    }

    switch (order.status) {
      case -2:
        invoice_product.forEach((inv_prod) => {
          tempArr.push(inv_prod)
          const prodArray = [];
          tempArr.forEach((prod) => {
            prodArray.push(prod);
          })
          if (prodArray.some((prod) => prod.products[0].qty === 0)) {
            order.status = -2;
          } else {
            order.status = 1;
            order.noStock = true;
          }
        })
        break;
      case -1:
        order.status = 1;
        break;
      case 1:
        order.status = 2;
        break;
      case 2:
        order.status = 3;
        break;
    }
    try {
      await Axios.patch(`invoices/${order.id}`, order);
      invoicesReFetch();
    } catch (e) {
      console.log(e.response.data.errors)
      setInvoiceError(e.response.data.errors);
    }
  };

  const declineOrder = async (order) => {
    try {
      await Axios.delete(`invoices/${order.id}`);
      invoicesReFetch();
    } catch (e) {
      console.log(e.response.data.errors);
      setInvoiceError(e.response.data.errors);
    }
  }

  return (
    <InvoiceContext.Provider value={{
      setAddress,
      invoices,
      isLoading,
      invoicesReFetch,
      storeInvoice,
      invoiceError,
      setInvoiceError,
      // getInvoice,
      declineOrder,
      acceptOrder,
      handleAddressChange
    }}>
      {children}
    </InvoiceContext.Provider>
  );
};

export default InvoiceContext;
