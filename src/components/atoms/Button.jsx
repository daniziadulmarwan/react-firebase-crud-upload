import React from "react";
import PropTypes from "prop-types";

const Button = (props) => {
  return <button {...props}>{props.children}</button>;
};

Button.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
  onChange: PropTypes.func,
};

export default Button;
