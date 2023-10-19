import React from "react";
import { NavLink } from "react-router-dom";

// a functional React component called UserMenu. It's a stateless functional
// component doesn't have its own state or lifecycle methods.
const UserMenu = () => {

//starts the function body and signifies the beginning of the component's JSX code.
  return (
    <div>
      <div className="text-center">
        <div className="list-group">
          <h6>Dashboard</h6>
          <NavLink
            to="/dashboard/user/profile"
            className="list-group-item list-group-item-action"
          >
            Profile
          </NavLink>
          <NavLink
            to="/dashboard/user/orders"
            className="list-group-item list-group-item-action"
          >
            Orders
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default UserMenu;