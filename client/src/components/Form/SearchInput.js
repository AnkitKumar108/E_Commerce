//This line imports the React library, which is necessary for creating React components.
import React from "react";

//This line imports the useSearch hook from a custom context located 
//in the file context/search.js. It's a custom hook used to manage 
//and access search-related state and functions
import { useSearch } from "../../context/search";


//This line imports the Axios library, which is commonly used for 
//making HTTP requests in React applications.
import axios from "axios";

//This line imports the useNavigate hook from the react-router-dom library.
// It's used for programmatic navigation within the application.
import { useNavigate } from "react-router-dom";

//This line defines a functional component named SearchInput.
const SearchInput = () => {

  // This line uses the useSearch hook to initialize a state variable 
  // values and a function setValues. values likely represents the state 
  // related to search, and setValues is a function used to update that state.
  const [values, setValues] = useSearch(); 
  
  // This line uses the useNavigate hook  
  // which can be used to navigate to different routes within the application.
  const navigate = useNavigate();

// This line defines an asynchronous function named handleSubmit that takes an event 
// object as its parameter. This function is executed when the search form is submitted.
  const handleSubmit = async (e) => {

    // This line prevents the default behavior of form submission, 
    // which would cause the page to reload.
    e.preventDefault();


    // This line uses Axios to send an HTTP GET request to a URL
    //  constructed using a template string
    //handles product searches, with the search keyword taken from the values state.
    try {
      const { data } = await axios.get(
        `/api/v1/product/search/${values.keyword}`
      );

      // This line updates the values adding a new property called results
      //with the data received from the server. 
      setValues({ ...values, results: data });

      //the navigate function to navigate to the "/search" route within the application.
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form className="d-flex" role="search" onSubmit={handleSubmit}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          

          // binds the input value to the values.keyword property and sets an 
          // onChange event handler to update the values state when the input value changes.
          value={values.keyword}
           onChange={(e) => setValues({ ...values, keyword: e.target.value })}
        />
        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchInput;