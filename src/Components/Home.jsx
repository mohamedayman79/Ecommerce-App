import React, { useContext } from "react";
import { ProductsContext } from "../Context/ProductsContext";
import { Link } from "react-router-dom";
import Loader from "./LoadingSpiner";
import CategorySlider from "./CategorySlider";
import MainSlider from "./MainSlider";

function Home() {
  const { productList, addToCart, addToFavorite, favorites, isLoading } =
    useContext(ProductsContext);

  return (
    <>
      {/* return products  */}

      <div className='products-container container'>
        <div className='row'>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <MainSlider />
              <CategorySlider />
            </>
          )}

          {isLoading ? (
            <Loader />
          ) : (
            productList.map((product) => (
              <div
                key={product.id}
                className=' col-card  col-sm-6 col-md-4 col-lg-3 col-xl-2'>
                <div className='product-card  mt-3  position-relative'>
                  <Link
                    to={`/ProductDetails/${product._id} `}
                    style={{ textDecoration: "none", color: "inherit" }}>
                    <img
                      src={product.imageCover}
                      alt={product.title}
                      className='w-100'
                    />
                    <h3>{product.title.split(" ").slice(0, 2).join(" ")}</h3>{" "}
                    {/* Display only the first two words */}
                    <div className='price-rate d-flex align-items-center justify-content-between'>
                      <span>{product.price} EGP </span>
                      <span>
                        <i className='fas fa-star rating-color'></i> 4.8
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
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
