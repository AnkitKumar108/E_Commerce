import {useEffect,useState} from 'react';
import axios from 'axios';
import { useAuth } from '../../context/auth';

 
const Dashboard = () => {
   
   const [users, setUsers] = useState("");
   const [products, setProducts] = useState("")
   const [orders, setOrders] = useState("")
   const [totalPrice, setTotalPrice] = useState("")

   //getTOtal product COunt
  const getProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setProducts(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  const getUsers = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/user-count");
      setUsers(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/order-count");
      setOrders(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  const getTotalPrice = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/total-price");
      setTotalPrice(data?.totalPrice);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTotalPrice();
    getProducts();
    getUsers();
    getOrders();
  }, []);
   
    return (
    <div class="col main pt-5 mt-3">
        <h5 class="lead d-none d-sm-block">Sales Report</h5>
        <div class="row mb-3">
            <div class="col-xl-3 col-sm-6 py-2">
                <div class="card bg-success text-white h-100">
                    <div class="card-body bg-success" style={{backgroundColor:"#57b960"}}>
                        <div class="rotate">
                            <i class="fa fa-user fa-4x"></i>
                        </div>
                        <h6 class="text-uppercase">Total Sales</h6>
                        <h1 class="display-auto">₹{totalPrice}</h1>
                    </div>
                </div>
            </div>
            <div class="col-xl-3 col-sm-6 py-2">
                <div class="card text-white bg-danger h-100">
                    <div class="card-body bg-danger">
                        <div class="rotate">
                            <i class="fa fa-list fa-4x"></i>
                        </div>
                        <h6 class="text-uppercase">Total Orders</h6>
                        <h1 class="display-4">{orders}</h1>
                    </div>
                </div>
            </div>
            <div class="col-xl-3 col-sm-6 py-2">
                <div class="card text-white bg-info h-100">
                    <div class="card-body bg-info">
                        <div class="rotate">
                          <i class="fab fa-twitter fa-4x"></i>
                        </div>
                        <h6 class="text-uppercase">Total Products</h6>
                        <h1 class="display-4">{products}</h1>
                    </div>
                </div>
            </div>
            <div class="col-xl-3 col-sm-6 py-2">
                <div class="card text-white bg-warning h-100">
                    <div class="card-body">
                        <div class="rotate">
                            <i class="fa fa-share fa-4x"></i>
                        </div>
                        <h6 class="text-uppercase">Active Customers</h6>
                        <h1 class="display-4">{users}</h1>
                    </div>
                </div>
            </div>
        </div>
 
        <hr/>
    </div>
    )
}

export default Dashboard