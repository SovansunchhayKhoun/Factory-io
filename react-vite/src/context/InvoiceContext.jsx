import {createContext, useContext, useEffect, useState} from "react";
import Axios from "axios";
import {useQuery} from "@tanstack/react-query";
import {useAuthContext} from "./AuthContext.jsx";

Axios.defaults.baseURL = import.meta.env.VITE_APP_URL;

const InvoiceContext = createContext();
export const InvoiceProvider = ({children}) => {
  const {data: invoices, isLoading, refetch: invoicesReFetch} = useQuery(['invoices'], () => {
    return Axios.get('invoices').then((res) => {
      return res.data.data;
    })
  });
  const [invStatus, setInvStatus] = useState(-1);
  const [invoice, setInvoice] = useState({});
  const [paymentPic, setPaymentPic] = useState('');
  const getInvoice = async (id) => {
    const apiItem = await Axios.get(`invoices/${id}`);
    setInvoice(apiItem.data.data);
  };
  const {user} = useAuthContext();
  const [invoiceError, setInvoiceError] = useState([]);
  const [address, setAddress] = useState('');
  const handleAddressChange = event => {
    setAddress(event.target.value);
  }

  const scrollTop = (fromTop) => {
    window.scrollTo({
      top: fromTop,
      behavior: "smooth",
    });
  }

  const storeInvoice = async (total, cartItem, checkOut, setLoading,paymentPic) => {
    const tempDate = new Date();
    const currentDate = tempDate.getFullYear() + '-' + (tempDate.getMonth() + 1) + '-' + tempDate.getDate() + ' ' + tempDate.getHours() + ':' + tempDate.getMinutes() + ':' + tempDate.getSeconds();
    const invoice = {
      user_id: user.id,
      date: currentDate,
      status: -1,
      address: address,
      totalPrice: total,
      payment_pic: paymentPic,
      item_count: cartItem.length,
    };
    try {
      await Axios.post('invoices', invoice, {
        headers: {'Content-Type' : "multipart/form-data"}
      });
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        cartItem.forEach((item) => {
          checkOut(item);
        });
      }, 3000);
      setAddress('');
    } catch (e) {
      scrollTop(0);
      console.log(e.response.data.errors);
      cartItem.addressError = 'The Address field is required';
      // setInvoiceError(e.response.data.errors);
      // setTimeout(() => {
      //   setInvoiceError([]);
      // }, 3000);
    }
  }

  const {data: items} = useQuery(['items'], () => {
    return Axios.get('products').then((res) => res.data.data);
  });

  const handleQty = (invProd, setInvProd, item) => event => {
    // console.log(event.target.value)
    if (event.target.value === '') {
      invProd.find((inv) => inv.id === item.id).qty = item.qty;
    } else if (Number(event.target.value)) {
      invProd.find((inv) => inv.id === item.id).qty = Number(event.target.value);
    }
  }

  const updateInvProd = (invProd) => {
    invProd.forEach(async (inv) => {
      try {
        await Axios.put(`invoice_products/${inv.id}`, inv);
      } catch (e) {
        console.log(e.response.data.errors);
      }
    })
  }

  const updateOrderStatus = (order) => {
    switch (order.status) {
      case -2:
        order.status = -1;
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
  }

  const checkInvoiceItemQty = (invoice_product) => {
    // const {invoice_product} = order;
    const stockArr = [];
    invoice_product.forEach((inv_prod) => {
      const stockItem = items.find((item) => inv_prod.product_id === item.id)
      stockItem.qty = stockItem.qty - inv_prod.qty;
      stockArr.push(stockItem);
    })
    return stockArr.some((prod) => prod.qty < 0); // true if some stock item is less than 0
  }

  const acceptOrder = async (order, invProd) => {
    const {invoice_product} = order;
    updateInvProd(invProd, order);
    if (checkInvoiceItemQty(invoice_product) && (order.status === -1 || order.status === 1 || order.status === -2)) {
      order.status = -2;
      order.noStock = true;
    } else {
      updateOrderStatus(order);
    }
    try {
      await Axios.patch(`invoices/${order.id}`, order);
      await invoicesReFetch();
    } catch (e) {
      console.log(e.response.data.errors)
      setInvoiceError(e.response.data.errors);
    }
  };

  const declineOrder = async (order) => {
    try {
      await Axios.delete(`invoices/${order.id}`);
      await invoicesReFetch();
    } catch (e) {
      console.log(e.response.data.errors);
      setInvoiceError(e.response.data.errors);
    }
  }

  return (
    <InvoiceContext.Provider value={{
      setAddress,
      address,
      invStatus,
      setInvStatus,
      handleQty,
      invoices,
      isLoading,
      invoicesReFetch,
      storeInvoice,
      invoiceError,
      setInvoiceError,
      declineOrder,
      acceptOrder,
      handleAddressChange,
      paymentPic,
      setPaymentPic
    }}>
      {children}
    </InvoiceContext.Provider>
  );
};

export default InvoiceContext;
