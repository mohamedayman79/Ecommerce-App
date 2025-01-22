import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "./LoadingSpiner";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getCategories() {
      setIsLoading(true);
      try {
        const response = await axios.get(
          "https://ecommerce.routemisr.com/api/v1/categories"
        );
        setCategories(response.data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setIsLoading(false);
      }
    }

    getCategories();
  }, []);

  return (
    <div className='categories-container container'>
      {isLoading ? (
        <Loader />
      ) : (
        <div className='row g-4 mt-1 mb-5'>
          <div className='col-xl-3 col-lg-4 col-md-6 col-sm-12 align-content-center p-5'>
            <h2 className='Our-Category fw-bolder'>Our Category</h2>
            <p className='text-muted'>
              You can see our categories and each category includes the products
              in it
            </p>
          </div>

          {categories.map((category) => (
            <div
              className='col-xl-3 col-lg-4 col-md-6 col-sm-12 d-flex justify-content-center'
              key={category.id}>
              <div className='category-card text-center'>
                <Link
                  to={`/category/${category._id}`}
                  style={{ textDecoration: "none", color: "inherit" }}>
                  <img
                    src={category.image}
                    className='category-image'
                    alt={category.name}
                  />
                  <h3 className='category-name'>{category.name}</h3>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Categories;
