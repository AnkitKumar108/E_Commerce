import React from 'react'

const CategoryForm = ({handleSubmit, value, setValue}) => {
  return (
    <>
    <form onSubmit={handleSubmit}>
    <div className="mb-3">

    <input 
       type="text" 
       className="form-control" 
       placeholder='Enter new category' 
       value={value} 
       onChange={(e) => setValue(e.target.value)}/>
    </div>

    <button type="submit" className="btn btn-primary">Submit</button>
    </form>

    </>
  )
}


export default CategoryForm


















// //This line imports the React library, which is necessary for creating 
// //React components. React is a JavaScript library for building user interfaces.
// import React from "react";

// //This line defines a functional React component called CategoryForm. 
// //This component takes three props: handleSubmit, value, and setValue. 
// //These props are destructured from the props object and will be used within the component.
// const CategoryForm = ({ handleSubmit, value, setValue }) => {


  
// //  This marks the beginning of the JSX (JavaScript XML) code block that represents the component's rendering.
//   return (
    
//    //<> and </>: These are called React fragments. 
//    //They allow you to return multiple elements from a component 
//    //without adding an extra parent element. In this case, it's used to group the form elements. 
//    // This line 20 defines an HTML <form> element that will trigger the handleSubmit function when it's submitted. 
//     <>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-3"> 
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Enter new category"

//             /* the input field's content will be controlled
//              by the value prop. */
//             value={value}

//            /*  Defines an onChange event handler that calls the 
//            setValue function (provided as a prop) 
//            with the new value when the user types in the input field. */
//             onChange={(e) => setValue(e.target.value)}
//           />
//         </div>

// { /* This line defines a element button element that, 
//     when clicked, submits the form. */ }
//         <button type="submit" className="btn btn-primary">
//           Submit
//         </button>
//       </form>
//     </>
//   );
// };

// // This line exports the CategoryForm component as the default 
// // export of this module. It makes the component available for use 
// // in other parts of your application.
// export default CategoryForm;




// import React, { useState } from "react";

// const CategoryForm = ({ handleSubmit }) => {
//   const [value, setValue] = useState("");
//   const [errors, setErrors] = useState({});

//   const isCategoryValid = (category) => {
//     // Check if category is not empty
//     if (!category.trim()) {
//       return false;
//     }

//     // Check if category contains only alphabets
//     if (!/^[a-zA-Z]+$/.test(category)) {
//       return false;
//     }

//     // Check if category has a minimum length of 2 characters
//     if (category.length < 2) {
//       return false;
//     }

//     return true;
//   };

//   const handleValidation = () => {
//     const category = value.trim();
//     const validationErrors = {};

//     if (!isCategoryValid(category)) {
//       if (!category) {
//         validationErrors.categoryRequired = "Category is required.";
//       } else if (!/^[a-zA-Z]+$/.test(category)) {
//         validationErrors.categoryInvalid = "Enter a valid category name";
//       } else if (category.length < 2) {
//         validationErrors.categoryTooShort = "Category is too short";
//       }
//     }

//     setErrors(validationErrors);
//     return Object.keys(validationErrors).length === 0;
//   };

//   const handleSubmitForm = (e) => {
//     e.preventDefault();
//     if (handleValidation()) {
//       handleSubmit(value);
//       setValue("");
//       setErrors({});
//     }
//   };

//   return (
//     <>
//       <form onSubmit={handleSubmitForm}>
//         <div className="mb-3">
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Enter new category"
//             value={value}
//             onChange={(e) => setValue(e.target.value)}
//           />
//           {errors.categoryRequired && <div className="text-danger">{errors.categoryRequired}</div>}
//           {errors.categoryInvalid && <div className="text-danger">{errors.categoryInvalid}</div>}
//           {errors.categoryTooShort && <div className="text-danger">{errors.categoryTooShort}</div>}
//         </div>

//         <button type="submit" className="btn btn-primary">
//           Submit
//         </button>
//       </form>
//     </>
//   );
// };

// export default CategoryForm;




