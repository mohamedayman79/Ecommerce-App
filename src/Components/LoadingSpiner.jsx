import React from "react";
import { BallTriangle } from "react-loader-spinner";

const Loader = ({ color = "#0aad0a", size = 100 }) => {
  return (
    <div className='loader'>
      <div className='  '>
        <BallTriangle
          height={size}
          width={size}
          color={color}
          ariaLabel='loading'
          wrapperStyle={{}}
          visible={true}
        />
      </div>
    </div>
  );
};

export default Loader;
