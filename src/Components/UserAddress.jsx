import React, { useState } from 'react';
import * as yup from 'yup';
import axios from 'axios';
import creditCard from "./Assets/images/creditCard-36cc884b.png";

const UserAddress = () => {

  const [formData, setFormData] = useState({
    address: '',
    phone: '',
    city: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = async () => {
    const schema = yup.object().shape({
      address: yup.string().min(5, 'Address must be at least 5 characters.').required('Address is required.'),
      phone: yup.string().matches(/^[0-9]{10,15}$/, 'Phone must be a valid number (10-15 digits).').required('Phone is required.'),
      city: yup.string().min(3, 'City must be at least 3 characters.').required('City is required.'),
    });

    try {
      await schema.validate(formData, { abortEarly: false });
      return null;
    } catch (error) {
      const validationErrors = {};
      error.inner.forEach((err) => {
        validationErrors[err.path] = err.message;
      });
      return validationErrors;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = await validateForm();
    if (validationErrors) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.post('https://api.example.com/checkout', formData);
      console.log('Success:', response.data);
      alert('Payment successful!');
      setFormData({ address: '', phone: '', city: '' });
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="payment-container container">
      <div className="row align-items-center justify-content-center">
        <div className="col-md-6">

          <form className="payment-form" onSubmit={handleSubmit}>

            <div className="mb-3">
              <label htmlFor="address" className="form-label">
                Detailed Address:
              </label>
              <input
                type="text"
                id="address"
                name="address"
                className="form-control"
                value={formData.address}
                onChange={handleChange}
              />
              {errors.address && <div className="text-danger">{errors.address}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                Phone:
              </label>

              <input
                type="text"
                id="phone"
                name="phone"
                className="form-control"
                value={formData.phone}
                onChange={handleChange}
              />
              {errors.phone && <div className="text-danger">{errors.phone}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="city" className="form-label">
                City:
              </label>
              <input
                type="text"
                id="city"
                name="city"
                className="form-control"
                value={formData.city}
                onChange={handleChange}
              />
              {errors.city && <div className="text-danger">{errors.city}</div>}
            </div>

            <button type="submit" className="btn btn-success w-100">
              Pay Now
            </button>

          </form>

        </div>

        <div className="col-md-6 text-center">
          <img
            src={creditCard}
            alt="Payment Illustration"
            className="payment-image"
          />
        </div>
        
      </div>
    </div>
  );
};

export default UserAddress;
