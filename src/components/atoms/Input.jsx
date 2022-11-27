import React from "react";
import PropTypes from "prop-types";

const Input = (props) => {
  return <input {...props} className="form-control" />;
};

Input.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string,
};

export default Input;
