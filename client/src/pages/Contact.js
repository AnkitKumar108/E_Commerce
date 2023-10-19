import React from "react";
import Layout from "./../components/Layout/Layout";

// library under the "Bi" namespace. These icons will be used later in the 
//component to display mail, phone, and support icons.
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";
const Contact = () => {
  return (
    <Layout title={"Contact us"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/contactus.jpg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <h1 className="bg-dark p-2 text-white text-center">Contact Us!</h1>
          <p className="text-justify mt-2">
          Have questions, feedback, or need assistance with an order? Our friendly customer support team is here to help.
          </p>
          <p className="mt-3">
            <BiMailSend /> : www.help@ecommerceankit.com
          </p>
          <p className="mt-3">
            <BiPhoneCall /> : +91-8808766788
          </p>
          <p className="mt-3">
            <BiSupport /> : 1800-8877-0000 (toll free)
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;