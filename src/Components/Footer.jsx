import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import paypal from "./Assets/images/paypal.png";
import amazon from "./Assets/images/amazon1.png";
import master from "./Assets/images/masterCard.png";
import americanExpress from "./Assets/images/americanExpress.png";
import googlePlay from "./Assets/images/google-play.png";
import appStore from "./Assets/images/app-store.png";
import Loader from "./LoadingSpiner";

export default function Footer() {
  const [isFooter, setIsFooter] = useState(true);
  const location = useLocation(); // استخدمنا useLocation لمتابعة التغيير في المسار

  useEffect(() => {
    setIsFooter(true); 
    const timer = setTimeout(() => {
      setIsFooter(false);
    }, 1000); 

    return () => clearTimeout(timer); 
  }, [location]); 

  return (
    <>
      {isFooter ? ('') : (
        <footer
          style={{ backgroundColor: "#f0f3f2" }}
          className='mt-3 pb-2 pt-5'>
          <div className='container'>
            <div className='main-footer border-bottom py-4'>
              <div className='row'>
                <div className='col-lg-6'>
                  <p className='d-inline-block pe-2'>Payment Partners</p>
                  <img
                    src={amazon}
                    width={60}
                    alt='amazon payment'
                  />
                  <img
                    src={americanExpress}
                    width={60}
                    alt='americanExpress payment'
                  />
                  <img
                    src={master}
                    width={60}
                    alt='master card payment'
                  />
                  <img
                    src={paypal}
                    width={60}
                    alt='paypal payment'
                  />
                </div>
                <div className='col-lg-6'>
                  <div className='d-flex flex-wrap justify-content-lg-end mt-lg-0 mt-3'>
                    <p className='d-inline-block pe-2'>
                      Get deliveries with FreshCart
                    </p>
                    <img
                      src={appStore}
                      width={90}
                      height={30}
                      alt='app store'
                    />
                    <img
                      src={googlePlay}
                      width={100}
                      height={30}
                      alt='google play'
                    />
                  </div>
                </div>
              </div>
            </div>

            <p className='text-center my-4'>
              Copyright 2024 &copy; by{" "}
              <span className='Copyright'> Mohamed ayman </span> . All rights
              reserved
            </p>
          </div>
        </footer>
      )}
    </>
  );
}
