import React from "react";

const Container = ({ children }) => {
  return (
    <div className="max-w-screen-xl	mx-auto md:px-12 px-4 md:py-8 py-4">
      {children}
    </div>
  );
};

export default Container;
