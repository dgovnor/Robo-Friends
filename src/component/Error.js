import React from "react";

const Error = ({ messages }) => {
  return (
    <div className="dark-red">
      <h2>{messages}</h2>
    </div>
  );
};
export default Error;
