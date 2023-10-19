import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

export default function PrivateRoute() {


//the useState hook to define a state variable ok and its updater function 
//setOk. ok is initialized with a default value of false.
  const [ok, setOk] = useState(false);

  //the auth variable to the current authentication state and 
  //setAuth to a function that can be used to update the authentication state.
  const [auth, setAuth] = useAuth();

  useEffect(() => {
  
    //check the user's authentication status.
    //GET request to a backend API to check if the user is authenticated
   //This line checks if the response from the API contains a property named "ok"
    //then user is authenticated.
    const authCheck = async () => {
      const res = await axios.get("/api/v1/auth/user-auth");
      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
  
    //checks if there is an auth object and it has a token property. If there is a token, it calls the authCheck function to 
    //check the user's authentication status.
    if (auth?.token) authCheck();
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner />;
}