import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/AuthStyles.css";
import { useAuth } from "../../context/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    email: "",
    password: "",
  });
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const isEmailValid = (email) => {
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailPattern.test(email);
  };

  const isPasswordValid = (password) => {
    const minLength = 6;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password);

    return {
      isValid:
        password.length >= minLength &&
        hasUppercase &&
        hasLowercase &&
        hasNumber &&
        hasSpecialChar,
      errors: {
        minLength: password.length < minLength,
        uppercase: !hasUppercase,
        lowercase: !hasLowercase,
        number: !hasNumber,
        specialChar: !hasSpecialChar,
      },
    };
  };

  const getPasswordError = (passwordValidation) => {
    const errors = [];
    if (passwordValidation.errors.minLength) {
      errors.push("at least 6 characters");
    }
    if (passwordValidation.errors.uppercase) {
      errors.push("uppercase");
    }
    if (passwordValidation.errors.lowercase) {
      errors.push("lowercase");
    }
    if (passwordValidation.errors.number) {
      errors.push("number");
    }
    if (passwordValidation.errors.specialChar) {
      errors.push("special character");
    }
    return errors.join(", ");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newError = {
      email: "",
      password: "",
    };

    if (!email) {
      newError.email = "Please enter your email.";
    } else if (!isEmailValid(email)) {
      newError.email = "Please enter a valid email address.";
    }

    if (!password) {
      newError.password = "Please enter your password.";
    } else {
      const passwordValidation = isPasswordValid(password);

      if (!passwordValidation.isValid) {
        newError.password = `Password must contain: ${getPasswordError(
          passwordValidation
        )}`;
      }
    }

    setError(newError);

    if (newError.email || newError.password) {
      return;
    }

    try {
      const res = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title="Register - Ecommerce App">
      <div className="form-container">
        <form onSubmit={handleSubmit} noValidate>
          <h4 className="title">Login</h4>

          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="email"
              name="email"
              placeholder="Enter Your Email"
            />
            <div className="error-message">{error.email}</div>
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="password"
              name="password"
              placeholder="Enter Your Password"
            />
            <div className="error-message">{error.password}</div>
          </div>

          <div className="mb-3">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                navigate("/forgot-password");
              }}
            >
              Forgot Password
            </button>
          </div>

          <button type="submit" className="btn btn-primary">
            LOGIN
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Login;





// import React, { useState } from "react";
// import Layout from "./../../components/Layout/Layout";
// import axios from "axios";
// import { useNavigate, useLocation } from "react-router-dom";
// import toast from "react-hot-toast";
// import "../../styles/AuthStyles.css";
// import { useAuth } from "../../context/auth";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState({
//     email: "",
//     password: "",
//   });
//   const [auth, setAuth] = useAuth();

//   const navigate = useNavigate();
//   const location = useLocation();

//   const isEmailValid = (email) => {
//     const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
//     return emailPattern.test(email);
//   };

//   const isPasswordValid = (password) => {
//     const minLength = 6;
//     const hasUppercase = /[A-Z]/.test(password);
//     const hasLowercase = /[a-z]/.test(password);
//     const hasNumber = /\d/.test(password);
//     const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password);

//     return {
//       isValid:
//         password.length >= minLength &&
//         hasUppercase &&
//         hasLowercase &&
//         hasNumber &&
//         hasSpecialChar,
//       errors: {
//         minLength: password.length < minLength,
//         uppercase: !hasUppercase,
//         lowercase: !hasLowercase,
//         number: !hasNumber,
//         specialChar: !hasSpecialChar,
//       },
//     };
//   };

//   const getPasswordError = (passwordValidation) => {
//     const errors = [];
//     if (passwordValidation.errors.minLength) {
//       errors.push("at least 6 characters");
//     }
//     if (passwordValidation.errors.uppercase) {
//       errors.push("uppercase");
//     }
//     if (passwordValidation.errors.lowercase) {
//       errors.push("lowercase");
//     }
//     if (passwordValidation.errors.number) {
//       errors.push("number");
//     }
//     if (passwordValidation.errors.specialChar) {
//       errors.push("special character");
//     }
//     return errors.join(", ");
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const newError = {
//       email: "",
//       password: "",
//     };

//     if (!email || !password) {
//       newError.email = "Please enter your email.";
//       newError.password = "Please enter your password.";

   
//      } else {
//       if (!isEmailValid(email)) {
//         newError.email = "Please enter a valid email address.";
//       }

//       const passwordValidation = isPasswordValid(password);

//       if (!passwordValidation.isValid) {
//         newError.password = `Password must contain: ${getPasswordError(
//           passwordValidation
//         )}`;
//       }
//     }

//     setError(newError);

//     if (newError.email || newError.password) {
//       return;
//     }

//     try {
//       const res = await axios.post("/api/v1/auth/login", {
//         email,
//         password,
//       });
//       if (res && res.data.success) {
//         toast.success(res.data && res.data.message);
//         setAuth({
//           ...auth,
//           user: res.data.user,
//           token: res.data.token,
//         });
//         localStorage.setItem("auth", JSON.stringify(res.data));
//         navigate(location.state || "/");
//       } else {
//         toast.error(res.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error("Something went wrong");
//     }
//   };

//   return (
//     <Layout title="Register - Ecommerce App">
//       <div className="form-container">
//         <form onSubmit={handleSubmit} noValidate>
//           <h4 className="title">Login</h4>

//           <div className="mb-3">
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="form-control"
//               id="email"
//               name="email"
//               placeholder="Enter Your Email"
//             />
//             <div className="error-message">{error.email}</div>
//           </div>
//           <div className="mb-3">
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="form-control"
//               id="password"
//               name="password"
//               placeholder="Enter Your Password"
//             />
//             <div className="error-message">{error.password}</div>
//           </div>

//           <div className="mb-3">
//             <button
//               type="button"
//               className="btn btn-primary"
//               onClick={() => {
//                 navigate("/forgot-password");
//               }}
//             >
//               Forgot Password
//             </button>
//           </div>

//           <button type="submit" className="btn btn-primary">
//             LOGIN
//           </button>
//         </form>
//       </div>
//     </Layout>
//   );
// };

// export default Login;






// import React, { useState } from "react";
// import Layout from "./../../components/Layout/Layout";
// import axios from "axios";
// import { useNavigate, useLocation } from "react-router-dom";
// import toast from "react-hot-toast";
// import "../../styles/AuthStyles.css";
// import { useAuth } from "../../context/auth";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(""); // Add this state for validation errors
//   const [auth, setAuth] = useAuth();

//   const navigate = useNavigate();
//   const location = useLocation();

//   const isEmailValid = (email) => {
//     // Regular expression to validate email pattern
//     const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
//     return emailPattern.test(email);
//   };

//   const isPasswordValid = (password) => {
//     // Password validation criteria
//     const minLength = 6;
//     const hasLetter = /[a-zA-Z]/.test(password);
//     const hasNumber = /\d/.test(password);
//     const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password);

//     return (
//       password.length >= minLength &&
//       hasLetter &&
//       hasNumber &&
//       hasSpecialChar
//     );
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!email || !password) {
//       setError("Please enter both email and password.");
//       return;
//     }

//     setError(""); // Clear any previous error messages

//     if (!isEmailValid(email)) {
//       setError("Please enter a valid email address.");
//       return;
//     }

//     if (!isPasswordValid(password)) {
//       setError("Password is invalid");
//       return;
//     }

//     try {
//       const res = await axios.post("/api/v1/auth/login", {
//         email,
//         password,
//       });
//       if (res && res.data.success) {
//         toast.success(res.data && res.data.message);
//         setAuth({
//           ...auth,
//           user: res.data.user,
//           token: res.data.token,
//         });
//         localStorage.setItem("auth", JSON.stringify(res.data));
//         navigate(location.state || "/");
//       } else {
//         toast.error(res.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error("Something went wrong");
//     }
//   };

//   return (
//     <Layout title="Register - Ecommerce App">
//       <div className="form-container">
//         <form onSubmit={handleSubmit} noValidate>
//           <h4 className="title">Login</h4>

//           <div className="mb-3">
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="form-control"
//               id="email"
//               name="email"
//               placeholder="Enter Your Email"
//               // required
//             />
//           </div>
//           <div className="mb-3">
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="form-control"
//               id="password"
//               name="password"
//               placeholder="Enter Your Password"
//               // required
//             />
//           </div>
//           <div className="error-message">{error}</div> {/* Error message element */}

//           <div className="mb-3">
//             <button
//               type="button"
//               className="btn btn-primary"
//               onClick={() => {
//                 navigate("/forgot-password");
//               }}
//             >
//               Forgot Password
//             </button>
//           </div>

//           <button type="submit" className="btn btn-primary">
//             LOGIN
//           </button>
//         </form>
//       </div>
//     </Layout>
//   );
// };

// export default Login;

