//facing some issues...in this section

import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";

//imports the moment library, which is commonly used for working with dates and times in JavaScript.
//antd" is a popular React UI library that provides pre-designed components for building user interfaces.
import moment from "moment";
import { Select } from "antd";
const { Option } = Select;


//an array containing different order statuses. The setStatus
//function is a setter function to update the status state.
const AdminOrders = () => {
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "deliverd",
    "cancel",
  ]);


//starts with an empty string, and setChangeStatus is the setter function to update this state.
  const [changeStatus, setCHangeStatus] = useState("");
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const getOrders = async () => {
    try {
 
//GET request using the Axios library to       
      const { data } = await axios.get("/api/v1/auth/all-orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

//etches a list of orders when the user is authenticated.
//will be executed whenever the value of auth?.token changes.  
  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  //This line sends a PUT request to a specific API
  //updates the status of an order identified by orderId with the new value
  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(`/api/v1/auth/order-status/${orderId}`, {
        status: value,
      });

//refresh the list of orders.      
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout title={"All Orders Data"}>
      <div className="row dashboard">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h4 className="text-center">All Orders</h4>

{/* o represents an order object, and i is the index of the current item. */}

          {orders?.map((o, i) => {
            return (
              <div className="border shadow">
                <table className="table">
                  <thead>
                    <tr>

         {/* a table header cell with the diff text               */}
                      <th scope="col">#</th>
                      <th scope="col">Status</th>
                      <th scope="col">Buyer</th>
                      <th scope="col"> date</th>
                      <th scope="col">Payment</th>
                      <th scope="col">Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
    {/* a table data cell with the value of i + 1. It likely represents the order number.               */}
                      <td>{i + 1}</td>
                      <td>
                        <Select
                          bordered={false}
                          onChange={(value) => handleChange(o._id, value)}
                          defaultValue={o?.status}
                        >
       {/* appears to map over an array called status and render options for the dropdown.                   
       likely represents an option in the dropdown.                     */}
                          {status.map((s, i) => (
                            <Option key={i} value={s}>
                              {s}
                            </Option>
                          ))}
                        </Select>
                      </td>

      {/* line starts a table data cell and displays the buyer's name from the o object, using optional 
      chaining (?.) to handle potential null or undefined values.
      This line starts a table data cell and displays the order creation
       date in a human-readable format using the moment library.                  */}
                      <td>{o?.buyer?.name}</td>
                      <td>{moment(o?.createAt).fromNow()}</td>
                      <td>{o?.payment}</td>
                      <td>{o?.quantity}</td>
                    </tr>
                  </tbody>
                </table>
            
                <div className="container">
                  {o?.products?.map((p, i) => (
                    <div className="row mb-2 p-3 card flex-row" key={p._id}>
                      <div className="col-md-4">
                        <img
                          src={`/api/v1/product/product-photo/${p._id}`}
                          className="card-img-top"
                          alt={p.name}
                          width="100px"
                          height={"100px"}
                        />
                      </div>

    {/* the second displays a truncated version of the product's description (only the first 30 characters),
     and the third displays the product's price (p.price).              */}
                      <div className="col-md-8">
                        <p>{p.name}</p>
                        <p>{p.description.substring(0, 30)}</p>
                        <p>Price : {(p.price)*o?.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;