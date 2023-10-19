import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";


//used to pass data through the component tree without having to pass props manually
// at each level. In this context, will store authentication-related data.
const AuthContext = createContext();
const AuthProvider = ({ children }) => {


//initializing auth with an object containing two properties: user and token
//hold information about the authenticated user and their authentication token.
const [auth, setAuth] = useState({
    user: null,
    token: "",
  });


//default axios authorization header
  axios.defaults.headers.common["Authorization"] = auth?.token;

//for handling side effects related to authentication.
//It retrieves authentication data from the localStorage with the key "auth." 
//If data exists, it parses the data and updates the auth state with the user 
//and token values retrieved from localStorage
  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parseData = JSON.parse(data);
      setAuth({
        ...auth,
        user: parseData.user,
        token: parseData.token,
      });
    }
  
    // It runs once..empty dependency array []
    //eslint-disable-next-line
  }, []);

 //returns the JSX content of the AuthProvider this provider makes the 
 ///auth state and the setAuth function available to all components nested inside it. 
  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

// custom hook......The useAuth hook can be used in other components to easily access the auth state and setAuth function.
const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };