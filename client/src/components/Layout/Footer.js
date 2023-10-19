import React from 'react'
import { Link } from "react-router-dom";

// defines a functional component called Footer
const Footer = () => {

  //This line begins the JSX code for the Footer component
  return (
    <div className="footer">
        <h1 className='text-center'>
             &copy; 2023
        </h1>

        <h4 className="text-center mt-3">
        "Thank you for shopping with us! Your satisfaction is our priority."
      </h4>

        <p className="text-center mt-3">
        <Link to="/about">About</Link>|<Link to="/contact">Contact Us</Link>
        
        {/* <Link to="/policy">Privacy Policy</Link> */}
      </p>


       


    </div>
  )
}

export default Footer