import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";

import { Toaster } from "react-hot-toast";



//a functional React component named Layout. It takes an object with several props: 
//children, title, description, keywords, and author. These props will be used to customize 
//the layout of the webpage and its metadata.
const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <div>


      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>


{/* starts the main section of the webpage and sets its minimum 
height to 70% of the viewport height (70vh). */}

        <Header />
        <main style={{ minHeight: "70vh" }}>
        <Toaster />
          
          {children}</main>
        <Footer />
    </div>
  )
}

// FOR SEO PURPOSE ,,, default wala for meta tags for can make later, SEO

Layout.defaultProps = {
  title: "Ecommerce app - shop now",
  description: "mern stack project",
  keywords: "mern,react,node,mongodb",
  author: "Ankit Kumar",
};



export default Layout