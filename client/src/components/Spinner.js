import React, { useState, useEffect } from "react";

//used for navigation and to access the current location in a React Router application.
import { useNavigate, useLocation } from "react-router-dom";

// a functional component named Spinner. It takes an
// optional prop path with a default value of "login."
const Spinner = ({ path = "login" }) => {
  const [count, setCount] = useState();
  const navigate = useNavigate();
  const location = useLocation();


  //he effect will run when the component is mounted or when any of its 
  //dependencies change.
  useEffect(() => {

 //this code sets up an interval that runs every 1000 
 //milliseconds (1 second). It decrements the count value 
 //by 1 each time it runs.   
    const interval = setInterval(() => {
      setCount((prevValue) => --prevValue);
    }, 1000);


    //If count is 0, it calls the navigate function to redirect the user to 
    //the URL specified by path, and it also passes the current location pathname as state data.
    count === 0 &&
    navigate(`/${path}`, {
        state: location.pathname,
      });

//it clears the interval to stop the countdown timer.     
    return () => clearInterval(interval);
  }, [count, navigate, location, path]);
  return (
    <>
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >

{/* //The countdown timer is displayed using the count state variable. */}
        <h4 className="Text-center">Wait....{count} </h4>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </>
  );
};

export default Spinner;