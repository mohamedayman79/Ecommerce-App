import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductsContext } from "../Context/ProductsContext";
import Loader from "./LoadingSpiner";

function ProductDetails() {
  const { addToCart } = useContext(ProductsContext);
  const [productDetails, setProductDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  let param = useParams();

  useEffect(() => {
    async function getProductDetails() {
      setIsLoading(true);
      try {
        let { data } = await axios.get(
          `https://ecommerce.routemisr.com/api/v1/products/${param.id}`
        );
        setProductDetails(data.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Axios error fetching product details:", error.message);
        } else {
          console.error("Unexpected error fetching product details:", error);
        }
      } finally {
        setIsLoading(false);
      }
    }

    getProductDetails();
  }, [param.id]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : productDetails ? (
        <div className='container'>
          <div className='row pt-5'>
            <div className='col-md-4 mb-4'>
              <div className='productDetails-image'>
                <div
                  id='productSlider'
                  className='carousel slide'
                  data-bs-ride='carousel'>
                  <div className='carousel-inner'>
                    {productDetails.images.map((image, index) => (
                      <div
                        className={`carousel-item ${
                          index === 0 ? "active" : ""
                        }`}
                        key={index}>
                        <img
                          src={image}
                          alt={productDetails.name}
                          className=''
                        />
                      </div>
                    ))}
                  </div>
                  <button
                    className='carousel-control-prev'
                    type='button'
                    data-bs-target='#productSlider'
                    data-bs-slide='prev'>
                    <span
                      className='carousel-control-prev-icon'
                      aria-hidden='true'></span>
                    <span className='visually-hidden'>Previous</span>
                  </button>
                  <button
                    className='carousel-control-next'
                    type='button'
                    data-bs-target='#productSlider'
                    data-bs-slide='next'>
                    <span
                      className='carousel-control-next-icon'
                      aria-hidden='true'></span>
                    <span className='visually-hidden'>Next</span>
                  </button>
                </div>
              </div>
            </div>
            <div className='col-md-8 align-content-center'>
              <div className='productDetails-content'>
                <h4>{productDetails.title}</h4>
                <p>{productDetails.description}</p>
                <h6>{productDetails.category.name}</h6>
                <h6>{productDetails.price}</h6>
                <div className='d-flex align-items-center justify-content-between flex-wrap mt-2'>
                  <span>
                    {" "}
                    ratingsQuantity: {productDetails.ratingsQuantity}
                  </span>
                  <span>
                    {productDetails.ratingsAverage}{" "}
                    <i className='fas fa-star rating-color pe-2'></i>
                  </span>
                </div>
                <button
                  onClick={() => addToCart(productDetails)}
                  className='btn bg-main w-100 mt-2'>
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading product details...</p>
      )}
    </>
  );
}

export default ProductDetails;
