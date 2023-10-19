
import React from "react";
import Layout from "./../components/Layout/Layout";

const Policy = () => {
  return (
    <Layout title={"Privacy Policy"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/priv.png"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <p4>Information We Collect</p4>
          <p>Information You Provide: When you make a purchase, create an account, or contact us, you may provide us with personal information such as your name, email address, shipping address, and payment information.</p>
          <p>Automatically Collected Information: We may collect certain information automatically when you visit our website, including your IP address, browser type, device information, and usage data.</p>
          <p>Cookies and Tracking Technologies: We use cookies and similar tracking technologies to enhance your online experience. These technologies may collect information about your browsing behavior and preferences.</p>
          
        </div>
      </div>
    </Layout>
  );
};

export default Policy;






// import React from 'react';
// import Layout from "./../components/Layout/Layout";

// const Policy = () => {
//   return (
//     <Layout>
//         <h1>Privicy Policy Page</h1>
//     </Layout>
//   );
// };

// export default Policy;