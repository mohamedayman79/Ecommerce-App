import { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../Context/ProductsContext";
import { Link } from "react-router-dom";
import Loader from "./LoadingSpiner";
import noProduct from "../Components/Assets/images/no-product-found-f64bec64.png";

export default function Products() {
  const {
    productList,
    setFavouret,
    favorites,
    addToCart,
    addToFavorite,
    isLoading,
    setIsLoading,
  } = useContext(ProductsContext);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavouret(JSON.parse(storedFavorites));
    }
    setIsLoading(false);
  }, [setFavouret, setIsLoading]);

  function getSearchData(e) {
    const searchData = e.target.value;
    setSearch(searchData);
  }

  const filteredProducts = search
    ? productList.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
      )
    : productList;

  return (
    <>
      {/* <section className='product-page mt-5 pt-4'>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <div className='search-input pt-5 d-flex align-content-center justify-content-center'>
              <input
                className='form-control w-50'
                onChange={getSearchData}
                placeholder='Search ...'
                type='search'
                name='search'
              />
            </div>

            <div className='products-container container'>
              <div className='row'>
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      className='col-card col-sm-6 col-md-4 col-lg-3 col-xl-2'>
                      <Link
                        to={`/ProductDetails/${product._id}`}
                        style={{ textDecoration: "none", color: "inherit" }}>
                        <div className='product-card mt-3 position-relative'>
                          <img
                            src={product.imageCover}
                            alt={product.title}
                            className='w-100'
                          />
                          <h3>
                            {product.title.split(" ").slice(0, 2).join(" ")}
                          </h3>
                          <div className='price-rate d-flex align-items-center justify-content-between'>
                            <span>{product.price} EGP </span>
                            <span>
                              <i className='fas fa-star rating-color'></i>{" "}
                              {product.ratingsAverage}
                            </span>
                          </div>
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
                      </Link>
                    </div>
                  ))
                ) : (
                  <div className='no-results text-center mt-5'>
                    <img
                      src={noProduct}
                      alt='No Results'
                      className='img-fluid'
                    />
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </section> */}

<section className='product-page mt-5 pt-4'>
  {isLoading ? (
    <Loader />
  ) : (
    <>
      <div className='search-input  d-flex align-content-center justify-content-center'>
        <input
          className='form-control w-50'
          onChange={getSearchData}
          placeholder='Search ...'
          type='search'
          name='search'
        />
      </div>

      <div className='products-container container'>
        <div className='row'>
          {search && filteredProducts.length === 0 ? (
            <div className='no-results text-center mt-5'>
              <img
                src={noProduct}
                alt='No Results'
                className='img-fluid'
              />
            </div>
          ) : (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                className='col-card col-sm-6 col-md-4 col-lg-3 col-xl-2'>
                  
                  <div className='product-card mt-3 position-relative'>
                  <Link to={`/ProductDetails/${product._id}`} style={{ textDecoration: "none", color: "inherit" }}>
                    <img
                      src={product.imageCover}
                      alt={product.title}
                      className='w-100'
                    />
                    <h3>
                      {product.title.split(" ").slice(0, 2).join(" ")}
                    </h3>
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
            ))
          )}
        </div>
      </div>
    </>
  )}
</section>
    </>
  );
}
