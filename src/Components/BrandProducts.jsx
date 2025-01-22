import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductsContext } from "../Context/ProductsContext";
import noProduct from "../Components/Assets/images/no-product-found-f64bec64.png";
import { Link } from "react-router-dom";
import Loader from "./LoadingSpiner";

function BrandProducts() {
  const { addToCart, addToFavorite, favorites, isLoading, setIsLoading } =
    useContext(ProductsContext);
  const [brandBroducts, setBrandBroducts] = useState([]);
  let param = useParams();

  useEffect(() => {
    async function getBrandProducts() {
      setIsLoading(true);
      try {
        let { data } = await axios.get(
          `https://ecommerce.routemisr.com/api/v1/products?brand=${param.id}`
        );
        setBrandBroducts(data.data);
      } catch (error) {
        console.error("Error fetching brand products:", error);
      } finally {
        setIsLoading(false);
      }
    }

    getBrandProducts();
  }, [param.id, setIsLoading]);

return (
<>
<div className='products-container container'>
<div>
{isLoading ? (
  <Loader />
) : brandBroducts.length === 0 ? (
  <div className='d-flex justify-content-center'>
    <img
      className='w-50'
      src={noProduct}
      alt='product is not available'
    />
  </div>
) : (
  <div className='row'>
    {brandBroducts.map((product) => (
      <div
        key={product.id}
        className='col-card col-sm-6 col-md-4 col-lg-3 col-xl-2'>
        
          <div className='product-card mt-3 position-relative'>
          <Link
          to={`/ProductDetails/${product._id}`}
          style={{ textDecoration: "none", color: "inherit" }}>
            <img
              src={product.imageCover}
              alt={product.title}
              className='w-100'
            />
            <h3>{product.title.split(" ").slice(0, 2).join(" ")}</h3>
            <div className='price-rate d-flex align-items-center justify-content-between'>
              <span>{product.price} EGP </span>
              <span>
                <i className='fas fa-star rating-color'></i>{" "}
                {product.ratingsAverage}
              </span>
            </div>
            </Link>
            <button
              onClick={() => addToCart(product)}
              className='btn-to-cart'>
              Add to Cart +
            </button>
            <button
              onClick={() => addToFavorite(product)}
              className='favorite-btn position-absolute'>
              {favorites.some((item) => item.id === product.id)
                ? "❤️"
                : "🤍"}
            </button>
          </div>
        
      </div>
    ))}
  </div>
)}
</div>
</div>
</>
);
}

export default BrandProducts;
