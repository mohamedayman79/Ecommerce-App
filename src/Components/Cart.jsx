import React, { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../Context/ProductsContext";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cart, setCart, setCartCount, cartCount, addToCart } = useContext(ProductsContext);
  const [totalPrice, setTotalPrice] = useState(0);

  function removeFromCart(id) {
    const updatedCart = cart.filter((product) => product.id !== id);
    setCart(updatedCart);
    setCartCount(updatedCart.length);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    localStorage.setItem("cartCount", updatedCart.length);
  }

  function removeOneProduct(product) {
    const updatedCart = [...cart];
    if (product.count > 1) {
      product.count -= 1;
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } else {
      removeFromCart(product.id);
    }
  }

  function removeAllCart() {
    localStorage.removeItem("cart");
    localStorage.removeItem("cartCount");
    setCart([]);
    setCartCount(0);
  }

  useEffect(() => {
    function getTotalPrice() {
      const resultTotal = cart.reduce(
        (total, item) => total + item.price * item.count,
        0
      );
      setTotalPrice(resultTotal);
    }
    getTotalPrice();
  }, [cart]);

  return (
    <div className='container bg-main-light'>
      <div className='row container-cart'>
        <div className='w-100 d-flex justify-content-between align-items-center flex-wrap'>
          <div>
            <h3> Shop Cart :</h3>
            <h4 className='h6 main-color fw-semibold'>
              Number Of Products <span className='text-dark'>{cartCount}</span>{" "}
            </h4>
            <h4 className='h6 fw-semibold main-color'>
              Total Cart Price <span className='text-dark'>{totalPrice}</span>
              EGP
            </h4>
          </div>

          <div className='btnPayment'>
            <Link
              className='text-decoration-none'
              to={"/UserAddress"}>
              <button className='btn-cart w-100 d-block mb-1 text-white main-background'>
                Online Payment
              </button>
            </Link>

            <button className='btn-cart w-100 d-block mb-1 text-white main-background'>
              Cash On Delivery
            </button>
          </div>
        </div>
        {cartCount === 0 ? (
          <div className='cart-message d-flex justify-content-center align-items-center '>
            <h2>Your cart is currently empty.</h2>
          </div>
        ) : (
          cart.map((product) => (
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
                    <h3>{product.title.split(" ").slice(0, 2).join(" ")}</h3>
                    <h6>{product.price} EGP</h6>
                    <button
                      onClick={() => removeFromCart(product.id)}
                      className='remove-btn'>
                      <i className='fa-solid fa-trash-can text-danger me-1'></i>
                      Remove
                    </button>
                  </div>

                  <div className='product-card-count align-content-center'>
                    <button
                      className='btn-count'
                      onClick={() => removeOneProduct(product)}>
                      {" "}
                      -{" "}
                    </button>
                    <span className='border-0 m-2'>{product.count}</span>{" "}
                    {/* Access count from product object */}
                    <button
                      className='btn-count'
                      onClick={() => addToCart(product)}>
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
        {cartCount > 0 && (
          <button
            className='remove-All-Cart main-background'
            onClick={removeAllCart}>
            Clear cart
          </button>
        )}
      </div>
    </div>
  );
}
