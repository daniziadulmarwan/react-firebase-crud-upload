import React from "react";
import propTypes from "prop-types";

const Input = (props) => {
  return (
    <input
      type={props.type}
      className={`form-control ${props.className}`}
      onChange={props.onChange}
      placeholder={props.placeholder}
      {...props}
    />
  );
};

Input.propTypes = {
  type: propTypes.string,
  className: propTypes.string,
  onChange: propTypes.func,
  placeholder: propTypes.string,
};

export default Input;
