import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "./LoadingSpiner";

function Brands() {
  const [brands, setBrands] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getBrands() {
      setIsLoading(true);
      try {
        let { data } = await axios.get(
          `https://ecommerce.routemisr.com/api/v1/brands`
        );
        setBrands(data.data);
      } catch (error) {
        console.error("Error fetching brands:", error);
      } finally {
        setIsLoading(false);
      }
    }
    getBrands();
  }, []);

  return (
    <div className='container'>
      {isLoading ? (
        <Loader key={isLoading} />
      ) : (
        <div className='row g-4 mt-1 mb-5'>
          <div className='col-xl-3 col-lg-4 col-md-6 col-sm-12 align-content-center p-5'>
            <h2 className='Our-brand fw-bolder'>Our brand</h2>
            <p className='text-muted'>
              You can see our categories and each category includes the products
              in it
            </p>
          </div>

          {brands.map((brand) => (
            <div
              className='col-xl-3 col-lg-4 col-md-6 col-sm-12 d-flex justify-content-center'
              key={brand.id}>
              <div className='brand-card text-center'>
                <Link
                  to={`/BrandProducts/${brand._id}`}
                  key={brand._id}
                  className='brands-card'
                  style={{ textDecoration: "none" }}>
                  <img
                    src={brand.image}
                    alt={brand.name}
                  />
                  <h6
                    className='brand-name'
                    style={{ textDecoration: "none", color: "black" }}>
                    {brand.name}
                  </h6>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Brands;
