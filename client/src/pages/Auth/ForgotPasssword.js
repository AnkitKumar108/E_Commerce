import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/AuthStyles.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState({
    email: "",
    newPassword: "",
    answer: "",
  });
  const [answer, setAnswer] = useState("");

  const navigate = useNavigate();

  const isEmailValid = (email) => {
    // Regular expression to validate email pattern
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailPattern.test(email);
  };

  const isPasswordValid = (password) => {
    // Password validation criteria
    const minLength = 6;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password);

    return (
      password.length >= minLength &&
      hasUppercase &&
      hasLowercase &&
      hasNumber &&
      hasSpecialChar
    );
  };

  const isAnswerValid = (answer) => {
    // Check if answer contains only letters
    const onlyLetters = /^[A-Za-z]+$/.test(answer);
    return onlyLetters;
  };



  const handleNameKeyPress = (e) => {
    // Get the key code of the pressed key
    const keyCode = e.charCode;

    // Check if the pressed key is a number (0-9)
    if (keyCode >= 48 && keyCode <= 57) {
      e.preventDefault(); // Prevent the input of numbers
    }
  };

  const handleKeyPress = (e) => {
    // Get the key code of the pressed key
    const keyCode = e.charCode;

    // Check if the pressed key is a number (0-9)
    if (keyCode < 48 || keyCode > 57) {
      e.preventDefault(); // Prevent the input of non-numeric characters
    }
  };







  const handleSubmit = async (e) => {
    e.preventDefault();

    const newError = {
      email: "",
      newPassword: "",
      answer: "",
    };

    if (!email) {
      newError.email = "Please enter your email.";
    } else if (!isEmailValid(email)) {
      newError.email = "Please enter a valid email address.";
    }
    

    if (!newPassword) {
      newError.newPassword = "Please enter your new password.";
    } else if (newPassword.length < 8) {
      newError.newPassword = "Password must be at least 8 characters.";
    }
    else if (!/[A-Z]/.test(newPassword)) {
      newError.newPassword = "Password must contain at least one uppercase letter.";
    } else if (!/[a-z]/.test(newPassword)) {
      newError.newPassword = "Password must contain at least one lowercase letter.";
    } else if (!/\d/.test(newPassword)) {
      newError.newPassword = "Password must contain at least one number.";
    } else if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(newPassword)) {
      newError.newPassword = "Password must contain at least one special character.";
    }

    if (!answer) {
      newError.answer = "Please enter your answer.";
    } else if (answer.length < 3) {
      newError.answer = "Answer is too short. Please enter at least 3 characters.";
    } else if (!isAnswerValid(answer)) {
      newError.answer = "Answer must contain only letters.";
    }

    if (newError.email || newError.newPassword || newError.answer) {
      setError(newError);
      return;
    }

    try {
      const res = await axios.post("/api/v1/auth/forgot-password", {
        email,
        newPassword,
        answer,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Forgot Password - Ecommerce APP"}>
      <div className="form-container">
        <form onSubmit={handleSubmit} noValidate>
          <h4 className="title">Reset Password</h4>

          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Email"
              required
            />
            <div className="error-message">{error.email}</div>
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Your New Password"
              required
              
            />
            <div className="error-message">{error.newPassword}</div>
          </div>

          <div className="mb-3">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              onKeyPress={handleNameKeyPress}
              className="form-control"
              id="exampleInputSportName"
              placeholder="Your Favorite Food"
              autoComplete="off"
            />
            <div className="error-message">{error.answer}</div>
          </div>

          <button type="submit" className="btn btn-primary">
            Reset
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default ForgotPassword;








// import React, { useState } from "react";
// import Layout from "./../../components/Layout/Layout";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import "../../styles/AuthStyles.css";

// const ForgotPassword = () => {
//   const [email, setEmail] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [error, setError] = useState(""); // Add this state for validation errors
//   const [answer, setAnswer] = useState("");

//   const navigate = useNavigate();

//   const isEmailValid = (email) => {
//     // Regular expression to validate email pattern
//     const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
//     return emailPattern.test(email);
//   };

//   const isPasswordValid = (password) => {
//     // Password validation criteria
//     const minLength = 6;
//     const hasUppercase = /[A-Z]/.test(password);
//     const hasLowercase = /[a-z]/.test(password);
//     const hasNumber = /\d/.test(password);
//     const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password);

//     return (
//       password.length >= minLength &&
//       hasUppercase &&
//       hasLowercase &&
//       hasNumber &&
//       hasSpecialChar
//     );
//   };

//   const isAnswerValid = (answer) => {
//     // Check if answer contains only letters
//     const onlyLetters = /^[A-Za-z]+$/.test(answer);
//     return onlyLetters;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!email || !newPassword || !answer) {
//       setError("Please enter email, new password, and answer.");
//       return;
//     }

//     setError(""); // Clear any previous error messages

//     if (!isEmailValid(email)) {
//       setError("Please enter a valid email address.");
//       return;
//     }



//     if (newPassword.length < 6) {
//       setError("Password must be at least 6 characters.");
//       return;
//     }

//     if (!/[A-Z]/.test(newPassword)) {
//       setError("Password must contain at least one uppercase letter.");
//       return;
//     }

//     if (!/[a-z]/.test(newPassword)) {
//       setError("Password must contain at least one lowercase letter.");
//       return;
//     }

//     if (!/\d/.test(newPassword)) {
//       setError("Password must contain at least one number.");
//       return;
//     }

//     if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(newPassword)) {
//       setError("Password must contain at least one special character.");
//       return;
//     }

//     if (!isAnswerValid(answer)) {
//       setError("Answer must contain only letters.");
//       return;
//     }

//     if (answer.length < 3) {
//       setError("Answer is too short");
//       return;
//     }

//     try {
//       const res = await axios.post("/api/v1/auth/forgot-password", {
//         email,
//         newPassword,
//         answer,
//       });
//       if (res && res.data.success) {
//         toast.success(res.data && res.data.message);
//         navigate("/login");
//       } else {
//         toast.error(res.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error("Something went wrong");
//     }
//   };

//   return (
//     <Layout title={"Forgot Password - Ecommerce APP"}>
//       <div className="form-container">
//         <form onSubmit={handleSubmit} noValidate>
//           <h4 className="title">Reset Password</h4>

//           <div className="mb-3">
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="form-control"
//               id="exampleInputEmail1"
//               placeholder="Enter Your Email"
//               required
//             />
//           </div>
//           <div className="mb-3">
//             <input
//               type="password"
//               value={newPassword}
//               onChange={(e) => setNewPassword(e.target.value)}
//               className="form-control"
//               id="exampleInputPassword1"
//               placeholder="Enter Your New Password"
//               required
//             />
//           </div>

//           <div className="mb-3">
//             <input
//               type="text"
//               value={answer}
//               onChange={(e) => setAnswer(e.target.value)}
//               className="form-control"
//               id="exampleInputSportName"
//               placeholder="Your Favorite  Food"
//               autoComplete="off"
//               // required
              
//             />
//           </div>

//           <div className="error-message">{error}</div> {/* Error message element */}

//           <button type="submit" className="btn btn-primary">
//             RESET
//           </button>
//         </form>
//       </div>
//     </Layout>
//   );
// };

// export default ForgotPassword;



// older code....................................................................................


// //functional component responsible for
// // rendering a form to reset a user's password.

// import React, { useState } from "react";
// import Layout from "./../../components/Layout/Layout";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import "../../styles/AuthStyles.css";

// //useState hook to declare three state variables: email, newPassword, 
// //and answer. These states are used to store the values entered by the
// // user in the form input fields.
// const ForgotPasssword = () => {
//   const [email, setEmail] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   // const [answer, setAnswer] = useState("");

//   const navigate = useNavigate();

//   // form function
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {

// //HTTP POST request      
// //This is typically how you'd send form data to a server for processing.
//       const res = await axios.post("/api/v1/auth/forgot-password", {
//         email,
//         newPassword,
//         // answer,
//       });

// //checks if the response from the server      
//       if (res && res.data.success) {
//         toast.success(res.data && res.data.message);

//         navigate("/login");
//       } else {
//         toast.error(res.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error("Something went wrong");
//     }
//   };
//   return (
//     <Layout title={"Forgot Password - Ecommerce APP"}>
//       <div className="form-container ">
//         <form onSubmit={handleSubmit}>
//           <h4 className="title">Reset Password</h4>

//           <div className="mb-3">

// {/* This code renders an <input> element with various attributes: */}
//             <input
//               type="email"
//               value={email}
//               // sets up an event handler to update the 
//               //email state when the input changes.
//               onChange={(e) => setEmail(e.target.value)}
//               className="form-control"
//               id="exampleInputEmail1"
//               placeholder="Enter Your Email "
//               required
//             />
//           </div>

          //  <div className="mb-3">
          //   <input
          //     type="text"
          //     value={answer}
          //     onChange={(e) => setAnswer(e.target.value)}
          //     className="form-control"
          //     id="exampleInputEmail1"
          //     placeholder="Enter Your favorite Sport Name "
          //     required
          //   />
          // </div> 

//           <div className="mb-3">
//             <input
//               type="password"
//               value={newPassword}
//               onChange={(e) => setNewPassword(e.target.value)}
//               className="form-control"
//               id="exampleInputPassword1"
//               placeholder="Enter New Password"
//               required
//             />
//           </div>

//           <button type="submit" className="btn btn-primary">
//             Reset
//           </button>
//         </form>
//       </div>
//     </Layout>
//   );
// };

// export default ForgotPasssword;