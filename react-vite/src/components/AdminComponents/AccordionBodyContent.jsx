import React, {Fragment, useContext, useEffect, useState} from "react";
import ProductContext from "../../context/ProductContext.jsx";
import InvoiceContext from "../../context/InvoiceContext.jsx";
import AdminPopUp from "../Modals/AdminPopUp.jsx";
import {ImageExpand} from "../ImageExpand.jsx";
import {Accordion, AccordionBody, AccordionHeader} from "@material-tailwind/react";
import {GoogleMap, MarkerF, useJsApiLoader} from "@react-google-maps/api";
import {GoogleMapsContext} from "../../context/GoogleMapsContext.jsx";

const libraries = ['places'];
export const AccordionBodyContent = (props) => {
  const {isLoaded} = useJsApiLoader({
      googleMapsApiKey: import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY,
      libraries
    }
  );
  const [map, setMap] = useState(/** @type google.maps.Map*/ (null))
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const {invProd, setInvProd} = props;
  const {id, date, totalPrice, status, address, invoice_product, user, placeId} = props.invoice;
  const {items} = useContext(ProductContext);
  const {handleQty} = useContext(InvoiceContext);
  const [open, setOpen] = useState(0);
  const handleOpen = async (value) => {
    const geoCode = new google.maps.Geocoder();
    await geoCode.geocode({placeId: placeId})
      .then(({results}) => {
        setLatitude(results[0].geometry.location.lat())
        setLongitude(results[0].geometry.location.lng())
      })
    setOpen(open === value ? 0 : value);
  };

  return (
    <div className="text-blackFactory font-semibold">
      <div className="px-6">
        <div className="flex justify-between mb-3">
          <div className="font-bold">Order ID: {id}</div>
          <div className="text-tealActive">
            {status === -1 && 'Pending'}
            {status === 1 && 'Accepted'}
            {status === 2 && 'Delivering'}
            {status === 3 && 'Arrived'}
          </div>
        </div>
        <div className="grid grid-cols-2 pr-12 gap-2 mb-3">
          <div>Order Date: {date}</div>
          <div>Phone Number: {user[0].phoneNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "-")}
          </div>
          <div>Username: {user[0].username}
          </div>
          <div className={`flex justify-between bg-[#D9D9D9] px-2 py-1 rounded-lg`}>
            <div>
              Address: {address}
            </div>
            <button>
              <Fragment>
                <Accordion open={open === 1}>
                  <AccordionHeader className="border-0 p-0" onClick={() => handleOpen(1)}>
                    <div>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                           stroke="currentColor" className={`w-6 h-6`}>
                        <path className="text-tealHover" strokeLinecap="round" strokeLinejoin="round"
                              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/>
                      </svg>
                    </div>
                  </AccordionHeader>
                </Accordion>
              </Fragment>
            </button>
          </div>
        </div>
        <div>
          <Fragment>
            <Accordion open={open === 1}>
              <AccordionBody className={`mt-2 border-0 p-0 ${open ? '' : 'hidden'}`}>
                <GoogleMap
                  center={{lat: latitude, lng: longitude}}
                  zoom={15}
                  mapContainerStyle={{width: 100 + "%", height: 400 + "px"}}
                  onLoad={map => setMap(map)}
                  options={{
                    disableDefaultUI: true,
                    fullscreenControl: true,
                    zoomControl: true
                  }}
                >
                  <MarkerF position={{lat: latitude, lng: longitude}}/>
                </GoogleMap>
              </AccordionBody>
            </Accordion>
          </Fragment>
        </div>
      </div>
      <div className={`accordion-item-body mb-3`}>
        <div>Item
          {
            invoice_product.map((item) => {
              return (
                <div key={item.id}>
                  {item.products.map((product) => {
                    return <div key={product.id}>{product.name}</div>
                  })}
                </div>
              )
            })
          }
        </div>

        <div>Type
          {
            invoice_product.map((item) => {
              return (
                <div key={item.id}>
                  {item.products.map((product) => {
                    return <div key={product.id}>{product.type}</div>
                  })}
                </div>
              )
            })
          }</div>
        <div>Qty
          {invoice_product.map((item) => {
            const stockItem = items?.find((i) => i.id === item.product_id);
            const inputStyle = 'border-none'
            return (
              <>
                <div key={item.id}>
                  <input onChange={handleQty(invProd, setInvProd, item)}
                         min="1"
                         className={`${props.invoice.status >= 2 && inputStyle} p-0 text-center max-w-[64px]`}
                         disabled={props.invoice.status >= 2}
                         type="text"
                         placeholder={item.qty}/>
                  <span
                    className="text-redBase">{(item.qty > stockItem?.qty && status === -2) && ` Stock QTY: ${stockItem?.qty}`}</span>
                </div>
              </>
            );
          })}
        </div>
        <div>Price
          {
            invoice_product.map((item) => {
              return (
                <div key={item.id}>
                  {item.products.map((product) => {
                    return <div key={product.id}>${product.price}</div>
                  })}
                </div>
              )
            })
          }</div>
        <div>Sub-total
          {invoice_product.map((item) => <div key={item.id}>${item.cart_item_price}</div>)}
        </div>
      </div>
      <hr className="border-b-1 border-blackFactory rounded-lg"/>
      <div className={`accordion-item-body`}>
        <div>Grand Total</div>
        <div></div>
        {/* for Grid*/}
        <div></div>
        {/* for Grid*/}
        <div></div>
        {/* for Grid*/}
        <div>${totalPrice}</div>
      </div>
    </div>
  )
    ;
}
