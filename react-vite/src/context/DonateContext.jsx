import {createContext, useContext, useEffect, useState} from "react";
import ProductContext from "./ProductContext.jsx";
import Axios from "axios";
import InvoiceContext, {InvoiceProvider} from "./InvoiceContext.jsx";
import invoiceContext from "./InvoiceContext.jsx";
import {useAuthContext} from "./AuthContext.jsx";
import InvoiceProductContext from "./InvoiceProductContext.jsx";
import {redirect, useNavigate, useNavigation} from "react-router-dom";
import UserContext from "./UserContext.jsx";
import {useQuery} from "@tanstack/react-query";
import axiosClient from "../axios-client.js";

Axios.defaults.baseURL = import.meta.env.VITE_APP_URL;
const DonateContext = createContext();
export const DonateProvider = ({children}) => {
  const [donations,setDonations] = useState([])
  // const []
  const {data: donationsQuery, refetch: donationsQueryReFetch, isLoading: donationLoading} = useQuery(['donationsQuery'], () => {
      return Axios.get(`donations`).then((res) => {
        setDonations(res.data.data);
        return res.data.data
      });
    }
  );

  return <DonateContext.Provider value={{
    donations,
    donationsQueryReFetch,
    donationLoading
  }}>
    {children}</DonateContext.Provider>;
};

export default DonateContext;
