"use client";

import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-800 p-4 mt-10 shadow-sm w-full">
      <div className="text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
