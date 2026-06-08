import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    items: [
  {
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
    },

    quantity: Number,

    returnRequested: {
      type: Boolean,
      default: false,
    },

    returnReason: {
      type: String,
      default: "",
    },

    refundType: {
      type: String,
      default: "",
    },

    returnStatus: {
      type: String,
      default: "",
    },
  },
],

    fullName: String,
    phone: String,
    pincode: String,
    locality: String,
    address: String,
    city: String,
    state: String,
    landmark: String,
alternatePhone: String,

    paymentMethod: String,



    payment: {
  type: Boolean,
  default: false,
},



paymentStatus: {
  type: String,
  default: "Pending",
},



    totalAmount: Number,

    status: {
  type: String,
  default: "Order Placed",
},


expectedDeliveryDate: {
  type: Date,
},

deliveredAt: {
  type: Date,
},


  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);