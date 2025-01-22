import axios from "axios";
import Joi from "joi";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
function Register() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    rePassword: "",
  });
  const [errorList, setErrorList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function getUser(e) {
    let myUser = { ...user };
    myUser[e.target.name] = e.target.value;
    setUser(myUser);
  }

  async function submitRegister(e) {
    e.preventDefault();
    setIsLoading(true);

    let validationResult = validateRegisterForm(user);
    if (validationResult.error) {
      setIsLoading(false);
      setErrorList(validationResult.error.details);
    } else {
      try {
        let response = await axios.post(
          `https://ecommerce.routemisr.com/api/v1/auth/signup`,
          user
        );

        if (response.data.message === "success") {
          setIsLoading(false);
          navigate("/login");
        }
      } catch (error) {
        setIsLoading(false);
        if (error.response) {
          setError(error.response.data.message);
        } else if (error.request) {
          setError("No response from server.");
        } else {
          setError("An error occurred: " + error.message);
        }
      }
    }
  }

  function validateRegisterForm(user) {
    let schema = Joi.object({
      name: Joi.string().min(3).max(30).required(),
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      }),
      phone: Joi.string().length(11).pattern(/^\d+$/).required(),
      password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,8}$")),
      rePassword: Joi.ref("password"),
    });

    return schema.validate(user, { abortEarly: false });
  }

  return (
    <>
      <div className='container'>
        <div className='w-75 mx-auto pt-4'>
          <h2 className='mb-4'>Register Now</h2>
          {errorList.map((error, index) => {
            if (index === 4) {
              return (
                <div
                  key={index}
                  className='alert alert-danger'>
                  {" "}
                  password invalid{" "}
                </div>
              );
            } else {
              return (
                <div
                  key={index}
                  className='alert alert-danger'>
                  {" "}
                  {error.message}{" "}
                </div>
              );
            }
          })}
          {error ? <div className='alert alert-danger'>{error}</div> : ""}

          <form onSubmit={submitRegister}>
            <label
              htmlFor='name'
              className='my-2'>
              Name:
            </label>
            <input
              onChange={getUser}
              className='form-control mb-2'
              id='name'
              name='name'
            />

            <label
              htmlFor='email'
              className='my-2'>
              Email:
            </label>
            <input
              onChange={getUser}
              type='email'
              className='form-control mb-2'
              id='email'
              name='email'
            />

            <label
              htmlFor='phone'
              className='my-2'>
              Phone:
            </label>
            <input
              onChange={getUser}
              type='text'
              className='form-control mb-2'
              id='phone'
              name='phone'
            />

            <label
              htmlFor='password'
              className='my-2'>
              Password:
            </label>
            <input
              onChange={getUser}
              type='password'
              className='form-control mb-2'
              id='password'
              name='password'
            />

            <label
              htmlFor='rePassword'
              className='my-2'>
              Re-enter Password:
            </label>
            <input
              onChange={getUser}
              type='password'
              className='form-control mb-2'
              id='rePassword'
              name='rePassword'
            />

            <button
              type='submit'
              className=' btn-Register mt-4'>
              {isLoading ? (
                <i className='fas fa-spinner fa-spin'></i>
              ) : (
                "Register"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
