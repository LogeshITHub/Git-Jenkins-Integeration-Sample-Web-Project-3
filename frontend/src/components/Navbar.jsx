import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="navbar-brand">
          Product Page
        </Link>
        <div className="nav-links">
          <Link to="/">Products</Link>
          <Link to="/add">Add Product</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
