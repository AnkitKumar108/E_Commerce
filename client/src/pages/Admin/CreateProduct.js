import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
const { Option } = Select;

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const [photoError, setPhotoError] = useState("");
  const [nameError, setNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [quantityError, setQuantityError] = useState("");
  const [shippingError, setShippingError] = useState("");
  const [categoryError, setCategoryError] = useState("");

  // get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting categories");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);


  //name validation preventing user to enter the number
  const handleNameChange = (e) => {
    const inputValue = e.target.value;
    const filteredValue = inputValue.replace(/[^a-zA-Z ]/g, "");
    // Update the name state with the filtered value
    setName(filteredValue);
  };

  // create product function
  const handleCreate = async (e) => {
    e.preventDefault();
    let isValid = true;

    // Photo validation
    if (!photo) {
      setPhotoError("Photo is required");
      isValid = false;
    } else if (photo.size > 5 * 1024 * 1024) {
      setPhotoError("Photo size must be less than 5 MB");
      isValid = false;
    } else {
      setPhotoError("");
    }

    // Name validation
    if (!name) {
      setNameError("Name is required.");
      isValid = false;
    } else if (name.length < 3) {
      setNameError("Name must be at least 3 characters long.");
      isValid = false;
    } else if (name.length > 25) {
      setNameError("Name must be 25 characters or less.");
      isValid = false;
    } else {
      setNameError("");
    }
    
    
    // if (!name || name.length < 3 || name.length > 25) {
    //   setNameError("Name is required and must be between 3 and 10 characters");
    //   isValid = false;
    // } else {
    //   setNameError("");
    // }

    // Description validation

    if (!description) {
      setDescriptionError("Description is required");
      isValid = false;
    } else {
      if (description.length < 15) {
        setDescriptionError("Description must be at least 15 characters");
        isValid = false;
      } else {
        if (description.length > 200) {
          setDescriptionError("Description must be at most 200 characters");
          isValid = false;
        } else {
          
          setDescriptionError("");
        }
      }
    }
    // if (!description || description.length < 15 || description.length > 200) {
    //   setDescriptionError("Description is required and must be between 15 and 50 characters");
    //   isValid = false;
    // } else {
    //   setDescriptionError("");
    // }

    // Price validation

    if (!price || isNaN(price) || parseFloat(price) <= 0) {
      if (!price) {
        setPriceError("Price is required");
      } else if (isNaN(price)) {
        setPriceError("Price must be a valid number");
      } else if (parseFloat(price) <= 0) {
        setPriceError("Price must be greater than zero");
      }
      isValid = false;
    } else {
      setPriceError("");
    }
    
    // if (!price || isNaN(price) || parseFloat(price) <= 0) {
    //   setPriceError("Price is required and must be a valid number greater than zero");
    //   isValid = false;
    // } else {
    //   setPriceError("");
    // }

    // Quantity validation
    if (!quantity) {
      setQuantityError("Quantity is required");
      isValid = false;
    } else {
      setQuantityError("");
    }
    
    // if (!quantity || isNaN(quantity)) {
    //   setQuantityError("Quantity is required and must be a valid number");
    //   isValid = false;
    // } else {
    //   setQuantityError("");
    // }

    // Shipping validation
    if (!shipping) {
      setShippingError("Shipping selection is required");
      isValid = false;
    } else {
      setShippingError("");
    }

    // Category validation
    if (!category) {
      setCategoryError("Category selection is required");
      isValid = false;
    } else {
      setCategoryError("");
    }

    if (isValid) {
      try {
        const productData = new FormData();
        productData.append("name", name);
        productData.append("description", description);
        productData.append("price", price);
        productData.append("quantity", quantity);
        productData.append("photo", photo);
        productData.append("category", category);
        const { data } = await axios.post(
          "/api/v1/product/create-product",
          productData
        );
        if (data?.success) {
          toast.error(data?.message);
        } else {
          toast.success("Product Created Successfully");
          navigate("/dashboard/admin/products");
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <Layout title={"Dashboard - Create Product"}>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h4>Create Product</h4>
            <div className="m-1 w-75">
              <Select
                bordered={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setCategory(value);
                  setCategoryError("");
                }}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              {categoryError && <div className="text-danger">{categoryError}</div>}
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
                {photoError && <div className="text-danger">{photoError}</div>}
              </div>
              <div className="mb-3">
                {photo && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="Enter a name"
                  className="form-control"
                  onChange={handleNameChange}
                  // onChange={(e) => setName(e.target.value)}
                />
                {nameError && <div className="text-danger">{nameError}</div>}
              </div>
              <div className="mb-3">
                <textarea
                  value={description}
                  placeholder="Enter a description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
                {descriptionError && <div className="text-danger">{descriptionError}</div>}
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  placeholder="Enter a Price"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                />
                {priceError && <div className="text-danger">{priceError}</div>}
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={quantity}
                  placeholder="Enter a quantity"
                  className="form-control"
                  onChange={(e) => setQuantity(e.target.value)}
                />
                {quantityError && <div className="text-danger">{quantityError}</div>}
              </div>
              <div className="mb-3">
                <Select
                  bordered={false}
                  placeholder="Select Shipping"
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setShipping(value);
                    setShippingError("");
                  }}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
                {shippingError && <div className="text-danger">{shippingError}</div>}
              </div>
              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleCreate}>
                  CREATE PRODUCT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;





// breakdown of code for better understanging

///old code does not have validation a


// import React, { useState, useEffect } from "react";
// import Layout from "./../../components/Layout/Layout";
// import AdminMenu from "./../../components/Layout/AdminMenu";
// import toast from "react-hot-toast";
// import axios from "axios";
// import { Select } from "antd";
// import { useNavigate } from "react-router-dom";
// const { Option } = Select;


// // use the useState hook to declare several pieces of state for your component.
// //such as its name, description, price, category, 
// //quantity, shipping information, and photo
// const CreateProduct = () => {
//   const navigate = useNavigate();
//   const [categories, setCategories] = useState([]);
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [price, setPrice] = useState("");
//   const [category, setCategory] = useState("");
//   const [quantity, setQuantity] = useState("");
//   const [shipping, setShipping] = useState("");
//   const [photo, setPhoto] = useState("");
  

//   //get all category

//   //defines an asynchronous function getAllCategory, 
//   //which is responsible for fetching a list of categories. It sends a GET request
//   const getAllCategory = async () => {
//     try {
//       const { data } = await axios.get("/api/v1/category/get-category");
//       if (data?.success) {
//         setCategories(data?.category);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error("Something wwent wrong in getting catgeory");
//     }
//   };

//   useEffect(() => {
//     getAllCategory();
//   }, []);

//   //create product function

//   //asynchronous function handleCreate that is called when a 
//   //form submission event occurs
//   const handleCreate = async (e) => {
//     e.preventDefault();
//     try {

//  //creates a new instance of FormData named productData to send data as a multipart/form-data request.     
//  //appends various form fields (name, description, price, quantity, photo, and category) to productData. 
//  const productData = new FormData();
//       productData.append("name", name);
//       productData.append("description", description);
//       productData.append("price", price);
//       productData.append("quantity", quantity);
//       productData.append("photo", photo);
//       productData.append("category", category);
//       const { data } = axios.post(
//         "/api/v1/product/create-product",
//         productData
//       );
//       if (data?.success) {
//         toast.error(data?.message);
//       } else {
//         toast.success("Product Created Successfully");
//         navigate("/dashboard/admin/products");
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error("something went wrong");
//     }
//   };

// //edited for the validation

// // const clearErrors = () => {
// //   const errors = document.getElementsByClassName('formerror');
// //   for (let item of errors) {
// //       item.innerHTML = "";
// //   }
// // }

// // const seterror = (id, error) => {
// //   // Check if the element with the specified id exists
// //   const element = document.getElementById(id);
// //   if (element) {
// //       const formErrorElement = element.querySelector('.formerror');
// //       if (formErrorElement) {
// //           formErrorElement.innerHTML = error;
// //       }
// //   }
// // }

// // const validateForm = () => {
// //     var returnval = true;
// //     clearErrors();

// //     if (!category) {
// //       seterror("category", "*Selection is mandatory");
// //       returnval = false;
// //     }
     
// //     return returnval;
// // }








//   return (
//     <Layout title={"Dashboard - Create Product"}>
//       <div className="container-fluid m-3 p-3">
//         <div className="row">
//           <div className="col-md-3">
//             <AdminMenu />
//           </div>
//           <div className="col-md-9">
//             <h4>Create Product</h4>
//             <div className="m-1 w-75">
//               <Select
//                 bordered={false}
//                 placeholder="Select a category"
//                 size="large"
//                 showSearch
//                 className="form-select mb-3"

//     // This sets an onChange event handler for the Select component, which calls the
//     //  setCategory function with the selected value when the user makes a selection.               
//                 onChange={(value) => {
//                   setCategory(value);
//                 }}
//               >

//  {/* This line renders an <Option> element with a key and a value prop                */}
//                 {categories?.map((c) => (
//                   <Option key={c._id} value={c._id}>
//                     {c.name}
//                   </Option>
//                 ))}
//                 </Select>

// {/* The "btn" class is often used to style buttons in Bootstrap. The "btn-outline-secondary" class likely specifies the button's appearance. 
// The "col-md-12" class specifies that the label should
//  take up the full width of its container on medium-sized screens.
//  If the photo variable has a truthy value (i.e., it's not null or 
//  undefined), it displays photo.name. Otherwise, it displays "Upload Photo". This is used as the label text inside the <label> element.
 
//  */}

// {/* This is an <input> element of type "file". It allows the user to select a file from their 
// device. The "accept" attribute restricts file selection to only image files. 
// The onChange event handler is triggered when a file is selected, and it sets the photo 
// state variable to the selected file. The "hidden" attribute hides the input element visually. */}
              
//               {/* <div className="mb-3">
//                 <label className="btn btn-outline-secondary col-md-12">
//                   {photo ? photo.name : "Upload Photo"}
//                   <input
//                     type="file"
//                     name="photo"
//                     accept="image/*"
//                     onChange={(e) => setPhoto(e.target.files[0])}
//                     hidden
//                   />
//                 </label>
//               </div> */}
//               <div className="mb-3">
//   <label className="btn btn-outline-secondary col-md-12">
//     {photo ? photo.name : "Upload Photo"}
//     <input
//       type="file"
//       name="photo"
//       accept="image/*"
//       onChange={(e) => {
//         const selectedFile = e.target.files[0];
//         if (selectedFile) {
//           if (selectedFile.size > 5 * 1024 * 1024) {
//             alert("File size must be less than 5 MB.");
//           } else {
//             setPhoto(selectedFile);
//           }
//         }
//       }}
//       hidden
//     />
//   </label>
// </div>





//               <div className="mb-3">
//                 {photo && (
//                   <div className="text-center">
//                     <img
//                       src={URL.createObjectURL(photo)}
//                       alt="product_photo"
//                       height={"200px"}
//                       className="img img-responsive"
//                     />
//                   </div>
//                 )}
//               </div>
//               <div className="mb-3">
//                 <input
//                   type="text"
//                   value={name}
//                   placeholder="write a name"
//                   className="form-control"
//                   onChange={(e) => setName(e.target.value)}
//                 />
//               </div>
// {/* 
// form for creating a product with fields for uploading a photo, entering
//  a name, description, price, quantity, and selecting a shipping option. 
//  The code uses Bootstrap classes for styling and appears to be part of a React component.               */}
//               <div className="mb-3">
//                 <textarea
//                   type="text"
//                   value={description}
//                   placeholder="write a description"
//                   className="form-control"
//                   onChange={(e) => setDescription(e.target.value)}
//                 />
//               </div>

//               <div className="mb-3">
//                 <input
//                   type="number"
//                   value={price}
//                   placeholder="write a Price"
//                   className="form-control"
//                   onChange={(e) => setPrice(e.target.value)}
//                 />
//               </div>
//               <div className="mb-3">
//                 <input
//                   type="number"
//                   value={quantity}
//                   placeholder="write a quantity"
//                   className="form-control"
//                   onChange={(e) => setQuantity(e.target.value)}
//                 />
//               </div>
//               <div className="mb-3">
//                 <Select
//                   bordered={false}
//                   placeholder="Select Shipping "
//                   size="large"
//                   showSearch
//                   className="form-select mb-3"
//                   onChange={(value) => {
//                     setShipping(value);
//                   }}
//                 >
//                   <Option value="0">No</Option>
//                   <Option value="1">Yes</Option>
//                 </Select>
//               </div>
//               <div className="mb-3">
//                 <button className="btn btn-primary" onClick={handleCreate}>
//                   CREATE PRODUCT
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default CreateProduct;