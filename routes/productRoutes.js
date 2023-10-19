import express from "express";
import {
  createProductController,
  getProductController,
  getSingleProductController,
  productPhotoController,
  deleteProductController,
  updateProductController,
  productFiltersController,
  productCountController,
  productListController,
  searchProductController,
  realtedProductController,
  productCategoryController,
  failedPayment,
  checkout,
  paymentVerification,
  brainTreePaymentController,
  braintreeTokenController,
  getProductReviewsController,
  createProductReviewController,
  userCountController,
  orderCountController,
  calculateTotalPriceController,
  } from "../controllers/productController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";

const router = express.Router();

//routes
router.post(
    "/create-product",
    requireSignIn,
    isAdmin,
    formidable(),
    createProductController
  );

//routes
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

  //get products
router.get("/get-product", getProductController);

//single product
router.get("/get-product/:slug", getSingleProductController);

//get photo
router.get("/product-photo/:pid", productPhotoController);


//delete rproduct
router.delete("/delete-product/:pid", deleteProductController);

//filter product
router.post("/product-filters", productFiltersController);

//product count
router.get("/product-count", productCountController);

//product per page
router.get("/product-list/:page", productListController);

//search product
router.get("/search/:keyword", searchProductController);

//similar product
router.get("/related-product/:pid/:cid", realtedProductController);

//category wise product
router.get("/product-category/:slug", productCategoryController);

//payments routes
//token
router.get("/braintree/token", braintreeTokenController);

//payments
router.post("/braintree/payment", requireSignIn, brainTreePaymentController);

//RAZORPAY
router.post('/razorpay/order',requireSignIn,checkout)

//RAZORPAY
router.post('/paymentverification',requireSignIn,paymentVerification)

//Failed Payment 
router.post('/paymentfailure',requireSignIn,failedPayment)

//Create Reviews
router.put(`/review/:pid`, requireSignIn, createProductReviewController)

//Get Reviews
router.get('/reviews/:pid', getProductReviewsController)

//user count
router.get("/user-count", userCountController);

//order count
router.get("/order-count", orderCountController);

//total sales - in price
router.get("/total-price", calculateTotalPriceController);


export default router;
