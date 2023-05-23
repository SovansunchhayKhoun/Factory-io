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
  const [invoiceError, setInvoiceError] = useState([]);

  const storeInvoice = async (total, cartItem, checkOut, setLoading, paymentPic) => {
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
        headers: {'Content-Type': "multipart/form-data"}
      });
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        cartItem.forEach((item) => {
          checkOut(item);
        });
      }, 3000);
      setAddress('');
      await invoicesReFetch();
    } catch (e) {
      scrollTop(0);
      console.log(e.response.data.errors);
      cartItem.addressError = 'The Address field is required';
      setInvoiceError(e.response.data.error);
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

  const updateInvProd = (invoice_product) => {
    invoice_product.forEach(async (inv) => {
      try {
        await Axios.put(`invoice_products/${inv.id}`, inv);
      } catch (e) {
        console.log(e.response.data.errors);
      }
    })
  }

  const updateOrder = async (invoice) => {
    try {
      await Axios.patch(`invoices/${invoice.id}`, invoice);
      await invoicesReFetch();
    } catch (e) {
      console.log(e.response.data.errors)
      setInvoiceError(e.response.data.errors);
    }
  };

  const updateOrderStatus = (invoice) => {
    switch (invoice.status) {
      case -1:
        invoice.status = 1;
        break;
      case 1:
        invoice.status = 2;
        break;
      case 2:
        invoice.status = 3;
        break;
    }
  }
  const checkInvoiceItemQty = async (invoice) => {
    const {invoice_product} = invoice;
    let stockArr = [];
    invoice_product.forEach((inv_prod) => {
      const stockItem = items.find((item) => inv_prod.product_id === item.id);
      const tempObj = {...stockItem, qty: stockItem.qty - inv_prod.qty}
      stockArr.push(tempObj);
    })
    if (stockArr.some((prod) => prod.qty < 0)) {
      invoice.status = -2;
    } else if (invoice.status === -2) {
      invoice.status = -1;
      updateOrderStatus(invoice);
    } else {
      updateOrderStatus(invoice);
    }
    await updateOrder(invoice);
  }

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
      updateInvProd,
      updateOrder,
      updateOrderStatus,
      checkInvoiceItemQty,
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
      handleAddressChange,
      paymentPic,
      setPaymentPic
    }}>
      {children}
    </InvoiceContext.Provider>
  );
};

export default InvoiceContext;
