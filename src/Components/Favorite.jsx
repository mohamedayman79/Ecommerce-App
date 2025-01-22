import React, { useContext, useEffect } from "react";
import { ProductsContext } from "../Context/ProductsContext";

function Favorite() {
  const { favorites, setFavouret, addToCart, setFavoriteCount, favoriteCount } =
    useContext(ProductsContext);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavouret(JSON.parse(storedFavorites));
    }
  }, [setFavouret]);

  if (!favorites || favorites.length === 0) {
    return (
      <div className='d-flex justify-content-center align-items-center mt-5'>
        <h3>No favorite products available.</h3>
      </div>
    );
  }

  // ----------------------------------------------//

  function removeFromFavorite(id) {
    const updatedFavouret = favorites.filter((product) => product.id !== id);
    setFavouret(updatedFavouret);
    setFavoriteCount(updatedFavouret.length);
    localStorage.setItem("favorites", JSON.stringify(updatedFavouret));
    localStorage.setItem("favoriteCount", updatedFavouret.length);
  }

  function removeAllFavorite() {
    localStorage.removeItem("favorites");
    localStorage.removeItem("favoriteCount");
    setFavouret([]);
    setFavoriteCount(0);
  }

  return (
    <>
      <div className='container bg-main-light'>
        <div className='row container-cart'>
          {favorites.map((product) => (
            <div
              key={product.id}
              className='product-card-cart row overflow-hidden'>
              <div className='col-md-1 mb-3'>
                <div className='product-card-image'>
                  <img
                    src={product.imageCover}
                    className='w-100'
                    alt={product.title}
                  />
                </div>
              </div>
              <div className='col-md-11'>
                <div className='flex-grow-1 d-flex justify-content-between'>
                  <div className='product-card-details'>
                    <h3>{product.title}</h3>
                    <h6>{product.price} EGP</h6>

                    <button
                      onClick={() => removeFromFavorite(product.id)}
                      className='remove-btn'>
                      <i className='fa-solid fa-trash-can text-danger me-1'></i>
                      Remove
                    </button>
                  </div>

                  <button
                    className='btn-add-cart-in-fav'
                    onClick={() => addToCart(product)}>
                    {" "}
                    add to cart{" "}
                  </button>
                </div>
              </div>
            </div>
          ))}

          {favoriteCount > 0 && (
            <div className='d-flex justify-content-center align-content-center mt-5'>
              <button
                className='remove-All-Cart main-background w-25'
                onClick={removeAllFavorite}>
                Clear Favorites
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Favorite;
