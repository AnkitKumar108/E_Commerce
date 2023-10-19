//useEffect: Enables side-effects in functional components. It's used for 
//data fetching, DOM manipulation, or any code that needs to run after 
//rendering. useState Hook allows us to track state in a function component.
//State generally refers to data or properties that need to be tracking in an application.
import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";

//Outlet component is typically used in React Router to render nested routes 
//inside parent route components.
import { Outlet } from "react-router-dom";
import axios from "axios";

//display a loading spinner while waiting 
import Spinner from "../Spinner";

// a functional component ,protect certain routes from being accessed by unauthenticated users.
export default function PrivateRoute() {

//This line uses the useState hook to declare a state variable called 
//ok and a function to update it called setOk. The initial value of ok is
// set to false. This state variable is likely used to track whether the 
//user is authenticated or not.
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();

//This hook runs a function
  useEffect(() => {

//authCheck asynchronous function that makes an HTTP GET request to 
//"/api/v1/auth/admin-auth". The response is stored in the res variable.
    const authCheck = async () => {
      const res = await axios.get("/api/v1/auth/admin-auth");
      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };

    //it only calls authCheck() if an authentiction token available.
    if (auth?.token) authCheck();
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner path="" />;
  //display a loading spinner while authentication is being checked.
}

// component appears to be responsible for checking the user's 
// authentication status and rendering either the child routes 
// (if authenticated) or a loading spinner (if not authenticated). 