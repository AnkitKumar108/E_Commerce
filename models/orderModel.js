import mongoose from "mongoose";

//FACING Issues in the components
const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        type: mongoose.ObjectId,
        ref: "Products",
      },
    ],
    payment: {
      type:String,
    },
    buyer: {
      type: mongoose.ObjectId,
      ref: "users",
    },
    status: {
      type: String,
      default: "Not Process",
      enum: ["Not Process", "Processing", "Shipped", "deliverd", "cancel"],
    },
    quantity: {
      type: Number,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);