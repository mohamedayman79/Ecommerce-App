import axios from "axios";
import Joi from "joi";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login(props) {
  const [user, setUser] = useState({
    email: "",
    password: "",
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

  async function submitLogin(e) {
    e.preventDefault();
    setIsLoading(true);

    let validationResult = validateLoginForm(user);
    if (validationResult.error) {
      setIsLoading(false);
      setErrorList(validationResult.error.details);
    } else {
      try {
        let response = await axios.post(
          `https://ecommerce.routemisr.com/api/v1/auth/signin`,
          user
        );

        if (response.data.message === "success") {
          localStorage.setItem("userToken", response.data.token);
          //  console.log(userToken);
          props.getUserData();
          setIsLoading(false);
          navigate("/home");
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

  function validateLoginForm(user) {
    let schema = Joi.object({
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      }),
      password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,8}$")),
    });

    return schema.validate(user, { abortEarly: false });
  }

  return (
    <>
      <div className='w-75 mx-auto pt-5'>
        <h2 className='mb-4'>Login Now</h2>
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

        <form onSubmit={submitLogin}>
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

          <button
            type='submit'
            className='btn-Register mt-4'>
            {isLoading ? <i className='fas fa-spinner fa-spin'></i> : "Login"}
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
