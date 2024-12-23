import React from "react";

//proposed Reuseable Button
const Button = ({ text, containerBtn, icons, Click }) => {
  return (
    <div className={containerBtn} onClick={Click}>
      {icons} {text}
    </div>
  );
};

export default Button;
