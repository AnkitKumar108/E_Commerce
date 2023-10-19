//it defines a component responsible for rendering a menu for an admin panel. 

//NavLink is used for creating navigation links in a React application and 
//provides features for managing the active state of links based on the current URL.
import React from "react";
import { NavLink } from "react-router-dom";

//a functional React component named AdminMenu.
const AdminMenu = () => {
  return (
    <>

{/* These classes are likely used for styling purposes, 
such as formatting the menu items. */}
      <div className="text-center">
        <div className="list-group dashboard-menu">
          <h4>Admin Panel</h4>
          <NavLink

// the target URL that the link will navigate to when clicked.

//Each NavLink has a different to attribute to specify the target URL and a different 
//text content for the menu item.
            to="/dashboard/admin/create-category"
            className="list-group-item list-group-item-action"
          >
            Create Category
          </NavLink>
          <NavLink
            to="/dashboard/admin/create-product"
            className="list-group-item list-group-item-action"
          >
            Create Product
          </NavLink>
          <NavLink
            to="/dashboard/admin/products"
            className="list-group-item list-group-item-action"
          >
            Products
          </NavLink>
          <NavLink
            to="/dashboard/admin/orders"
            className="list-group-item list-group-item-action"
          >
            Orders
          </NavLink>
          <NavLink
            to="/dashboard/admin/users"
            className="list-group-item list-group-item-action"
          >
            Users
          </NavLink>
          
        </div>
      </div>
    </>
  );
};

export default AdminMenu;
//exports the AdminMenu component so that it can be imported 
//and used in other parts of the application.