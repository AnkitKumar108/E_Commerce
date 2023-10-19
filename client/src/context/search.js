import { useState, useContext, createContext } from "react";

//created a new context object called SearchContext using the createContext
//function. Context is a way to share state between components in a React application.
const SearchContext = createContext();

//a new functional component accepts a prop called children, which 
//represents the child components that will be wrapped by this provider.
// initializes auth as an object with two properties: keyword (initialized as an empty string) 
//and results (initialized as an empty array). 
//setAuth is a function that can be used to update the auth state.
const SearchProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    keyword: "",
    results: [],
  });


  //JSX code returned by the SearchProvider component. makes the auth state and the setAuth function available to all 
  //components that are descendants of the SearchProvider component.
  return (
    <SearchContext.Provider value={[auth, setAuth]}>
      {children}
    </SearchContext.Provider>
  );
};

// custom hook.... This hook uses the useContext hook to access the SearchContext.
// When you call useSearch in a component, it will return the [auth, setAuth]
// value from the SearchContext.Provider, allowing you to access and update the auth state.
const useSearch = () => useContext(SearchContext);

export { useSearch, SearchProvider };