import React, { useEffect, useState } from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../components/Form/CategoryForm";
import { Modal } from "antd";
const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  //handle Form
  const handleSubmit = async (e) => {
    //e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/category/create-category", {
        name,
      });
      if (data?.success) {
        toast.success(`${name} is created`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      // toast.error("somthing went wrong in input form");
    }
  };

  //get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wwent wrong in getting catgeory");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //update category
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (data?.success) {
        toast.success(`${updatedName} is updated`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //delete category
  const handleDelete = async (pId) => {
    try {
      const { data } = await axios.delete(
        `/api/v1/category/delete-category/${pId}`
      );
      if (data.success) {
        toast.success(`category is deleted`);

        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Somtihing went wrong");
    }
  };
  return (
    <Layout title={"Dashboard - Create Category"}>
      <div className="row dashboard">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">Manage Category</h1>
            <div className="p-3 w-50">
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>
            <div className="w-75">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((c) => (
                    <>
                      <tr>
                        <td key={c._id}>{c.name}</td>
                        <td>
                          <button
                            className="btn btn-primary ms-2"
                            onClick={() => {
                              setVisible(true);
                              setUpdatedName(c.name);
                              setSelected(c);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger ms-2"
                            onClick={() => {
                              handleDelete(c._id);
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal
              onCancel={() => setVisible(false)}
              footer={null}
              visible={visible}
            >
              <CategoryForm
                value={updatedName}
                setValue={setUpdatedName}
                handleSubmit={handleUpdate}
              />
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;



// import React, { useEffect, useState } from "react";
// import Layout from "./../../components/Layout/Layout";
// import AdminMenu from "./../../components/Layout/AdminMenu";
// import toast from "react-hot-toast";
// import axios from "axios";
// import CategoryForm from "../../components/Form/CategoryForm";
// import { Modal } from "antd";
// const CreateCategory = () => {
//   const [categories, setCategories] = useState([]);
//   const [name, setName] = useState("");
//   const [visible, setVisible] = useState(false);
//   const [selected, setSelected] = useState(null);
//   const [updatedName, setUpdatedName] = useState("");
//   //handle Form
//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     try {
//       const { data } = await axios.post("/api/v1/category/create-category", {
//         name,
//       });
//       if (data?.success) {
//         toast.success(`${name} is created`);
//         getAllCategory();
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error("somthing went wrong in input form");
//     }
//   };

//   //get all cat
//   const getAllCategory = async () => {
//     try {
//       const { data } = await axios.get("/api/v1/category/get-category");
//       if (data?.success) {
//         setCategories(data?.category);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error("Something went wrong in getting catgeory");
//     }
//   };

//   useEffect(() => {
//     getAllCategory();
//   }, []);

//   //update category
//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await axios.put(
//         `/api/v1/category/update-category/${selected._id}`,
//         { name: updatedName }
//       );
//       if (data?.success) {
//         toast.success(`${updatedName} is updated`);
//         setSelected(null);
//         setUpdatedName("");
//         setVisible(false);
//         getAllCategory();
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   //delete category
//   const handleDelete = async (pId) => {
//     try {
//       const { data } = await axios.delete(
//         `/api/v1/category/delete-category/${pId}`
//       );
//       if (data.success) {
//         toast.success(`category is deleted`);

//         getAllCategory();
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error("Something went wrong");
//     }
//   };
//   return (
//     <Layout title={"Dashboard - Create Category"}>
//       <div className="container-fluid m-3 p-3 dashboard">
//         <div className="row">
//           <div className="col-md-3">
//             <AdminMenu />
//           </div>
//           <div className="col-md-9">
//             <h1>Manage Category</h1>
//             <div className="p-3 w-50">
//               <CategoryForm
//                 handleSubmit={handleSubmit}
//                 value={name}
//                 setValue={setName}
//               />
//             </div>
//             <div className="w-75">
//               <table className="table">
//                 <thead>
//                   <tr>
//                     <th scope="col">Name</th>
//                     <th scope="col">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {categories?.map((c) => (
//                     <>
//                       <tr>
//                         <td key={c._id}>{c.name}</td>
//                         <td>
//                           <button
//                             className="btn btn-primary ms-2"
//                             onClick={() => {
//                               setVisible(true);
//                               setUpdatedName(c.name);
//                               setSelected(c);
//                             }}
//                           >
//                             Edit
//                           </button>
//                           <button
//                             className="btn btn-danger ms-2"
//                             onClick={() => {
//                               handleDelete(c._id);
//                             }}
//                           >
//                             Delete
//                           </button>
//                         </td>
//                       </tr>
//                     </>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//             <Modal
//               onCancel={() => setVisible(false)}
//               footer={null}
//               visible={visible}
//             >
//               <CategoryForm
//                 value={updatedName}
//                 setValue={setUpdatedName}
//                 handleSubmit={handleUpdate}
//               />
//             </Modal>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default CreateCategory;





// import React, { useEffect, useState } from "react";
// import Layout from "./../../components/Layout/Layout";
// import AdminMenu from "./../../components/Layout/AdminMenu";
// import toast from "react-hot-toast";
// import axios from "axios";
// import CategoryForm from "../../components/Form/CategoryForm";
// //used for creating modal dialogs.
// // initializes a state variable categories as an empty array and a 
// //function setCategories to update its value. This state likely stores the list of categories
// import { Modal } from "antd";
// const CreateCategory = () => {
//   const [categories, setCategories] = useState([]);
//   const [name, setName] = useState("");
//   const [visible, setVisible] = useState(false);
//   const [selected, setSelected] = useState(null);
//   const [updatedName, setUpdatedName] = useState("");

//   //handle Form... function will be called when a form is submitted.
//   // prevents the default form submission behavior, which would cause the page to reload.
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {

//  //sends a POST request to the specified API      
//       const { data } = await axios.post("/api/v1/category/create-category", {
//         name,
//       });
//       if (data?.success) {
//         toast.success(`${name} is created`);
//         getAllCategory();
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error("Somthing went wrong in input form");
//     }
//   };

//   // HTTP GET request to the specified API get all cat...conditional 
//   //statement checks if the response data contains
//   // a property named "success" with a truthy value.
//   const getAllCategory = async () => {
//     try {
//       const { data } = await axios.get("/api/v1/category/get-category");
//       if (data.success) {
//         setCategories(data.category);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error("Something went wrong in getting catgeory");
//     }
//   };

// //used to fetch category data when the component is initially loaded.
// //due to the empty dependency array []
//   useEffect(() => {
//     getAllCategory();
//   }, []);

//   //update category

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     try {

//     //sends an HTTP PUT request to the specified API endpoint, which likely updates 
//     //a category. The selected._id and updatedName values are included in the request body      
//       const { data } = await axios.put(
//         `/api/v1/category/update-category/${selected._id}`,
//         { name: updatedName }
//       );
//       if (data.success) {
//         toast.success(`${updatedName} is updated`);
//         setSelected(null);
//         setUpdatedName("");
//         setVisible(false);
// // function is called again to fetch the updated list of categories after a successful update.        
//         getAllCategory();
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error("Something went wrong");
//     }
//   };


//   //delete category

//   //function takes a parameter pId, which presumably represents the 
//   //ID of the category to be deleted.
//   const handleDelete = async (pId) => {
//     try {

// //sends a DELETE request to the API       
//       const { data } = await axios.delete(
//         `/api/v1/category/delete-category/${pId}`
//       );
//       if (data.success) {
//         toast.success(`category is deleted`);

// //refreshes the list of categories by calling getAllCategory().        
//         getAllCategory();
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error("Somtihing went wrong");
//     }
//   };
//   return (
//     <Layout title={"Dashboard - Create Category"}>
//       <div className="container-fluid m-3 p-3">
//         <div className="row">
//           <div className="col-md-3">
//             <AdminMenu />
//           </div>
//           <div className="col-md-9">
//             <h4>Manage Category</h4>
//             <div className="p-3 w-50">
//               <CategoryForm
//                 handleSubmit={handleSubmit}
//                 value={name}
//                 setValue={setName}
//               />
//             </div>
//             <div className="w-75">
//               <table className="table">
//                 <thead>
//                   <tr>
//                     <th scope="col">Name</th>
//                     <th scope="col">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {categories?.map((c) => (
//                     <>
//                       <tr>
//                         <td key={c._id}>{c.name}</td>
//                         <td>
//                           <button
//     // expression that maps over an array called categories.                      
//                             className="btn btn-primary ms-2"
//                             onClick={() => {
//                               setVisible(true);
//                               setUpdatedName(c.name);
//                               setSelected(c);
//                             }}
//                           >
//                             Edit
//                           </button>
//                           <button

// // This line sets an event handler for the button's onClick event. When the button is clicked, it will 
// // execute the handleDelete function with the argument c._id.                        
//                             className="btn btn-danger ms-2"
//                             onClick={() => {
//                               handleDelete(c._id);
//                             }}
//                           >
//                             Delete
//                           </button>
//                         </td>
//                       </tr>
//                     </>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//             <Modal
//               onCancel={() => setVisible(false)}
//               footer={null}
//               visible={visible}
//             >
//               <CategoryForm
//                 value={updatedName}
//                 setValue={setUpdatedName}
//                 handleSubmit={handleUpdate}
//               />
//             </Modal>
//           </div>
//         </div>
//      </div>
//    </Layout>
//    );
//  };

// export default CreateCategory; 

