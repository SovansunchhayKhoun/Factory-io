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
  const {totalPrice, status, invoice_product, user} = props.invoice;
  const {address, placeId} = props.invoice.address[0];
  const {items, getType} = useContext(ProductContext);
  const {handleQty} = useContext(InvoiceContext);
  const [open, setOpen] = useState(false);
  const handleOpen = async () => {
    const geoCode = new google.maps.Geocoder();
    await geoCode.geocode({placeId: placeId})
      .then(({results}) => {
        setLatitude(results[0].geometry.location.lat())
        setLongitude(results[0].geometry.location.lng())
      })
  };

  return (
    <div className="text-blackFactory px-2 flex flex-col gap-1 font-semibold">
      <section className="">
        <div className="
          flex flex-col
          lg:text-base md:text-sm
          text-[10px]
          gap-2 mb-3">
          <div className="flex justify-between">
            <div>Username: {user[0].username}</div>
            <div>Phone Number: {user[0].phoneNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "-")}
            </div>
          </div>
          {/*<div>Order Date: {date}</div>*/}
          <div className={`flex items-center justify-between bg-[#D9D9D9] px-2 py-1 rounded-lg`}>
            <div>
              {address}
            </div>
            <div className="">
              <Fragment>
                <Accordion open={open}>
                  <AccordionHeader className="border-0 p-0" onClick={async () => {
                    setOpen(!open);
                    await handleOpen()
                  }}>
                    <div className="">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                           stroke="currentColor" className={`md:w-6 md:h-6
                           w-4 h-4`}>
                        <path className="text-tealHover" strokeLinecap="round" strokeLinejoin="round"
                              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/>
                      </svg>
                    </div>
                  </AccordionHeader>
                </Accordion>
              </Fragment>
            </div>
          </div>

        </div>


        <div>
          <Fragment>
            <Accordion open={open}>
              <AccordionBody className={`mt-2 border-0 p-0 ${open ? '' : 'hidden'}`}>
                <GoogleMap
                  center={{lat: latitude, lng: longitude}}
                  zoom={15}
                  mapContainerStyle={{width: 100 + "%", height: 200 + "px"}}
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

      </section>
      {invoice_product.map((item) => {
        const stockItem = items?.find((i) => i.id === item.product_id);
        const inputStyle = 'border-none'
        const {products} = item;
        return (
          <section key={item.id} className="
              flex gap-4 items-center justify-between
              lg:text-base md:text-sm
              text-[10px]">
            {/*qty*/}
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                   stroke="currentColor"
                   className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
              </svg>
              {/*for user view*/}
              <div
                className={`${user?.acc_type !== 1 && 'hidden'} lg:max-w-[32px] lg:text-sm md:text-xs md:max-w-[20px] max-w-[12px]`}>
                {item.qty}
              </div>
              {/*--for user view*/}
              {/*for admin to update qty if no stock*/}
              <div className="flex flex-col items-center gap-2">
                <input onChange={handleQty(invProd, setInvProd, item)}
                       min="1"
                       className={`${props.invoice.status >= 2 && inputStyle} max-w-[64px] p-0 border text-center`}
                       disabled={props.invoice.status >= 2}
                       type="text"
                       placeholder={item.qty}/>
                <div
                  className="text-redBase">{(item.qty > stockItem?.qty && status === -2) && ` Stock QTY: ${stockItem?.qty}`}</div>
                {/*--for admin to update qty if no stock*/}
              </div>
            </div>
            {/*name*/}
            <div className='flex-1'>
              <div>
                {products.map((product) => {
                  return product.name
                })}
              </div>
              {/*type*/}
              <div className={"text-redHover"}>
                {products.map((product) => {
                  return getType(product?.type)
                })}
              </div>
            </div>
            {/*subtotal*/}
            <div className={""}>${item.cart_item_price}</div>
          </section>
        );
      })}
      <hr className="border-b-1 border-blackFactory rounded-lg"/>
      <div className={`flex justify-between
      lg:text-base md:text-sm text-[12px]`}>
        <div>Grand Total</div>
        <div>${totalPrice}</div>
      </div>
    </div>
  );
}
