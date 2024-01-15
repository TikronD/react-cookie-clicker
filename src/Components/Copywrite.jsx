import React from "react";

const currentDate = new Date();
const year = currentDate.getFullYear();

function Copywrite() {
  return <h5>&copy; {year} by</h5>;
}

function Title() {
  return <span>Lord </span>;
}

function Name() {
  return <span> Daniel Hahn</span>;
}

export default Copywrite;
export { Title, Name };
