import React from "react";

const Footer = () => {
  return (
    <footer className="p-10 bg-gray-800 font-Montserrat flex flex-col items-center text-gray-400">
      <p>This is a graduation project.</p>
      <p className="my-3">Not for business's purpose.</p>
      <p>Shan Mi {new Date().toLocaleDateString()}</p>
    </footer>
  );
};

export default Footer;
