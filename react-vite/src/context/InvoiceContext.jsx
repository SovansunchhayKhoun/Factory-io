import {createContext, useContext, useEffect, useState} from "react";
import Axios from "axios";
import {useQuery} from "@tanstack/react-query";
import {useAuthContext} from "./AuthContext.jsx";
import {GoogleMap, MarkerF, useJsApiLoader} from "@react-google-maps/api";
import {GoogleMapsContext} from "./GoogleMapsContext.jsx";
import {useAddressContext} from "./AddressContext.jsx";

Axios.defaults.baseURL = import.meta.env.VITE_APP_URL;
const libraries = ['places'];
const InvoiceContext = createContext();
export const InvoiceProvider = ({children}) => {
  // need to redeclare cuz cannot access product context to this context
  const {data: items} = useQuery(['items'], () => {
    return Axios.get('products').then((res) => res.data.data);
  });

  const {data: invoices, isLoading, refetch: invoicesReFetch} = useQuery(['invoices'], () => {
    return Axios.get('invoices').then((res) => {
      return res.data.data;
    })
  });
  const [invoiceError, setInvoiceError] = useState([]);
  const {address, setAddress, placeId} = useContext(GoogleMapsContext)

  const {user} = useAuthContext();
  const [invStatus, setInvStatus] = useState(-1);
  const [invoice, setInvoice] = useState({});
  const [paymentPic, setPaymentPic] = useState('');
  const getInvoice = async (id) => {
    const apiItem = await Axios.get(`invoices/${id}`);
    setInvoice(apiItem.data.data);
  };

  const scrollTop = (fromTop) => {
    window.scrollTo({
      top: fromTop,
      behavior: "smooth",
    });
  }

  const {addressExist} = useAddressContext();
  const {storeAddress} = useContext(GoogleMapsContext);
  const postInvoice = async (total, cartItem, paymentPic, clearCart, setCartItem, setModalOpen, setSuccess, data) => {
    const tempDate = new Date();
    const currentDate = tempDate.getFullYear() + '-' + (tempDate.getMonth() + 1) + '-' + tempDate.getDate() + ' ' + tempDate.getHours() + ':' + tempDate.getMinutes() + ':' + tempDate.getSeconds();
    const invoice = {
      user_id: user?.id,
      date: currentDate,
      status: -1,
      // placeId: placeId,
      // address: address,
      totalPrice: total,
      payment_pic: paymentPic,
      item_count: cartItem.length,
    };
    invoice.address_id = data?.id
    // post invoice to db
    await Axios.post('invoices', invoice, {
      headers: {'Content-Type': "multipart/form-data"}
    }).then(async () => {
      // get posted invoice
      await Axios.get('getLastInv').then(async ({data}) => {
        // then post item to pivot table
        await cartItem.forEach(item => {
          item.invoice_id = data?.id;
          item.user_id = user?.id;
          Axios.post('invoice_products', item)
            .then(res => res)
            .catch(e => {
              setInvoiceError(e.response.data.errors);
              console.log(e.response.data.errors);
            })
        })
      })
    }).then(() => {
      invoicesReFetch()
      clearCart();
      setCartItem([]);
      setModalOpen(false);
      setAddress('');
    }).catch((e) => {
      setInvoiceError(e.response.data.errors);
      scrollTop(0);
      setModalOpen(false);
      console.log(e.response.data.errors)
    });


    // to stop loading
    setSuccess(true)
  }

  const storeInvoice = async (total, cartItem, paymentPic, clearCart, setCartItem, setModalOpen, setSuccess) => {
    if(addressExist) {
      await Axios.get(`getAddress/${address}`).then(async ({data}) => {
        console.log(data[0])
        await postInvoice(total, cartItem, paymentPic, clearCart, setCartItem, setModalOpen, setSuccess, data[0])
      })
    } else {
      await storeAddress().then(async () => {
        await Axios.get('getLastAddress').then(async ({data}) => {
          console.log(data)
          // invoice.address_id = data?.id
          await postInvoice(total, cartItem, paymentPic, clearCart, setCartItem, setModalOpen, setSuccess, data);
        })
      }).catch(e => console.log(e.response.data.errors))
    }
  }

  const handleQty = (invProd, setInvProd, item) => event => {
    if (event.target.value === '') {
      invProd.find((inv) => inv.id === item.id).qty = item.qty;
    } else if (Number(event.target.value)) {
      event.target.value = event.target.value.replace(/[^0-9]/g, '');
      event.target.value = event.target.value.replace(/(\..*)\./g, '$1');
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

  const declineOrder = async (setModalOpen, order) => {
    try {
      await Axios.delete(`invoices/${order.id}`).then(() => {
        invoicesReFetch();
        setModalOpen(false)
      });
    } catch (e) {
      console.log(e.response.data.errors);
      setInvoiceError(e.response.data.errors);
    }
  }

  return (
    <InvoiceContext.Provider value={{
      scrollTop,
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
      paymentPic,
      setPaymentPic
    }}>
      {children}
    </InvoiceContext.Provider>
  );
};

export default InvoiceContext;
