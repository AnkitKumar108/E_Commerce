import { useState, useEffect } from "react";
import axios from "axios";

export default function useCategory() {

  //the useState hook to create a piece of state called categories
  const [categories, setCategories] = useState([]);

  // defines an asynchronous arrow function responsible for making an HTTP request to fetch categories.
  const getCategories = async () => {
    try {
  
// send a GET request to the url, the await keyword is used to wait for the response.
//to safely access the category property of the data object.
const { data } = await axios.get("/api/v1/category/get-category");
      setCategories(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

 
  //call the getCategories function to fetch and set the categories.
  useEffect(() => {
    getCategories();
  }, []);

  return categories;
}