//the followingcode sets up a React application, imports necessary 
//libraries and components, configures context providers, and 
//renders the root component of the application within a specific 
//DOM element.


import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App"; //root component of theapplication.

// function is used to measure and report 
//the performance of your web application.
import reportWebVitals from "./reportWebVitals";

// used for client-side routing in your application.
import { BrowserRouter } from "react-router-dom";

// Context providers are typically used
// for managing global state in a React application.
import { AuthProvider } from "./context/auth";
import { SearchProvider } from "./context/search";
import { CartProvider } from "./context/cart";

import "antd/dist/reset.css"; //Ant Design library


//line creates a React root using ReactDOM.createRoot and specifies the
 //DOM element with the id "root" as the target for rendering your React 
 //application. This is where your entire React app will be mounted.
const root = ReactDOM.createRoot(document.getElementById("root"));

//This structure ensures that the application has access to authentication,
// search, and cart-related context throughout its components.
root.render(
  <AuthProvider>
    <SearchProvider>
      <CartProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CartProvider>
    </SearchProvider>
  </AuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

//reportWebVitals function to start measuring the 
//performance of your web application
reportWebVitals();
