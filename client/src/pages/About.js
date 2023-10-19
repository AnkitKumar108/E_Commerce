import React from "react";
import Layout from "./../components/Layout/Layout";

const About = () => {
  return (
    <Layout title={"About us - Ecommer app"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/about.jpg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <p className="text-justify mt-2">
          <h4 className="text-justify mt-2">
          Welcome to E-commerce Shopping, your ultimate destination for quality products and exceptional shopping experiences.

          {/* I believe in learning by doing. With Practice this E-commerce web, I'll have the opportunity to engage in practical exercises that simulate real-world e-commerce scenarios.  */}
          </h4>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;


// import React from 'react';
// import Layout from "./../components/Layout/Layout";

// const About = () => {
//   return (
//     <Layout>
//         <h1>About Page</h1>
//     </Layout>
//   );
// };

// export default About;