
// library is commonly used for creating and verifying JSON 
//Web Tokens for authentication and authorization purposes.
import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";


//Protected Routes token base
// takes three parameters: req (the request object), res (the response 
//object), and next (a function to call the next middleware or route 
//handler in the request-response cycle).
export const requireSignIn = async (req, res, next) => {
    try {


//uses the jsonwebtoken library's verify method to verify 
//the JWT provided in the Authorization header of the HTTP request 
      const decode = JWT.verify(
        req.headers.authorization,
        process.env.JWT_SECRET
      );
      req.user = decode;
      next();
    } catch (error) {
      console.log(error);
    }
  };

  //admin acceess
export const isAdmin = async (req, res, next) => {
    try {
      const user = await userModel.findById(req.user._id);
      if (user.role !== 1) {
        return res.status(401).send({
          success: false,
          message: "UnAuthorized Access",
        });
      } else {
        next();
      }
    } catch (error) {
      console.log(error);
      res.status(401).send({
        success: false,
        error,
        message: "Error in admin middelware",
      });
    }
  };