import React from "react";
import NavBar from "../navbar/Navbar";

const Layout = () => {
  return (
    <>
    <NavBar/>
    <main>
      <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">{children}</div>
    </main>
    </>
  );
};

export default Layout;
