import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ProductsContext = createContext();

function ProductsContextProvider({ children }) {
  const [productList, setProductList] = useState([]);
  const [cart, setCart] = useState([]);
  const [favorites, setFavouret] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [favoriteCount, setFavoriteCount] = useState(0);
  const [productCountInCart, setProductCountInCart] = useState(0);
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // api call to get products
  useEffect(() => {
    async function getProducts() {
      setIsLoading(true);
      try {
        let { data } = await axios.get(
          `https://ecommerce.routemisr.com/api/v1/products`
        );
        setProductList(data?.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    getProducts();
  }, []);

  // get cart and counts from local storage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const storedCartCount =
      parseInt(localStorage.getItem("cartCount"), 10) || 0;
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const storedFavoriteCount =
      parseInt(localStorage.getItem("favoriteCount"), 10) || 0;

    setCart(storedCart);
    setCartCount(storedCartCount);
    setFavouret(storedFavorites);
    setFavoriteCount(storedFavoriteCount);
  }, []);

  //-------------------------------------------------------//

  function addToCart(product) {
    const updatedCart = [...cart];
    const productIndex = updatedCart.findIndex(
      (item) => item.id === product.id
    );

    if (productIndex >= 0) {
      updatedCart[productIndex].count =
        (updatedCart[productIndex].count || 0) + 1;
    } else {
      updatedCart.push({ ...product, count: 1 });
    }
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    // Update the total count of items in the cart
    const totalItemCount = updatedCart.reduce(
      (total, item) => total + item.count,
      0
    );
    setProductCountInCart(totalItemCount);
    localStorage.setItem("productCountInCart", totalItemCount);

    // Update the cart count (number of unique items in the cart)
    setCartCount(updatedCart.length);
    localStorage.setItem("cartCount", updatedCart.length);

    setAlertMessage("Product successfully added!");
    setShowAlert(true);

    setTimeout(() => {
      setShowAlert(false);
    }, 1000);
  }

  // -------------------------------------------------------//
  const addToFavorite = (product) => {
    const isFavorite = favorites.includes(product); // If the product is available in the options
    let updatedFavorites;
    if (isFavorite) {
      updatedFavorites = favorites.filter((item) => item.id !== product.id); // Remove the product
      setFavoriteCount((prevCount) => {
        const newCount = prevCount - 1;
        localStorage.setItem("favoriteCount", newCount);
        return newCount;
      });
    } else {
      updatedFavorites = [...favorites, product]; // Add product
      setFavoriteCount((prevCount) => {
        const newCount = prevCount + 1;
        localStorage.setItem("favoriteCount", newCount);
        return newCount;
      });
    }
    setFavouret(updatedFavorites);
    localStorage.setItem(
      "favorites",
      JSON.stringify(updatedFavorites.map(({ window, ...rest }) => rest))
    ); // Remove circular references
  };

  return (
    <ProductsContext.Provider
      value={{
        productList,
        setProductList,
        cart,
        setCart,
        setFavouret,
        favorites,
        addToFavorite,
        addToCart,
        cartCount,
        setCartCount,
        favoriteCount,
        setFavoriteCount,
        productCountInCart,
        isLoading,
        setIsLoading,
      }}>
      {children}

      <div className={`alert-box ${showAlert ? "show" : ""}`}>
        {alertMessage}
      </div>
    </ProductsContext.Provider>
  );
}

export default ProductsContextProvider;
