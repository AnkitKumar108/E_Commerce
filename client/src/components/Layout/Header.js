//These lines import necessary modules and components for the React application
import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import SearchInput from "../Form/SearchInput";

//A custom hook for diff pur
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";

//component from the Ant Design library used for displaying a badge with a count.
import { Badge } from "antd";



//useAuth and useCart hooks to access the authentication and 
//cart state, respectively. auth contains information about 
//the authenticated user, and cart holds the shopping cart items.
const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();

  //calls the useCategory hook to fetch a list of categories 
  //and stores them in the categories variable.
  //removes the authentication token from local storage, and 
  //displays a success toast message.
  const categories = useCategory();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };
  return (
    <>
    {/* It defines the structure of the header navigation bar. */}
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >

{/* in nav> element sets up the navigation bar. It includes a logo link, search input, navigation links 
( Home, Categories, Register, Login, Dashboard, Logout, Cart), and a badge displaying the cart item count.             */}
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link to="/" className="navbar-brand">
             Ecommerce
            </Link>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <SearchInput />
              <li className="nav-item">
                <NavLink to="/" className="nav-link ">
                  Home
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to={"/categories"}
                  data-bs-toggle="dropdown"
                >
                  Categories
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to={"/categories"}>
                      All Categories
                    </Link>
                  </li>
                  {categories?.map((c) => (
                    <li>
                      <Link
                        className="dropdown-item"
                        to={`/category/${c.slug}`}
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              {/* The code uses conditional rendering to display different links and
               menu items based on whether a user is authenticated or not. */}


              {!auth?.user ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/register" className="nav-link">
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link">
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown">
                    <NavLink
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      style={{ border: "none" }}
                    >
                      {auth?.user?.name}
                    </NavLink>
                    <ul className="dropdown-menu">
                      <li>

                    <NavLink
                          to={`/dashboard/${
                            auth?.user?.role === 1 ? "admin" : "user"
                          }`}
                          className="dropdown-item"
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          onClick={handleLogout}
                          to="/login"
                          className="dropdown-item"
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              )}
   {/* The Badge component from Ant Design is used to display a 
   badge with the count of items in the shopping cart. It only displays if 
   there are items in the cart
               */}
              {auth?.user?.role === 1 ?
               (
                <li className="nav-item">

                </li>
               )
              :(<li className="nav-item">
                <Badge count={cart?.length} showZero>
                  <NavLink to="/cart" className="nav-link">
                    Cart
                  </NavLink>
                </Badge>
              </li>)}
              
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;