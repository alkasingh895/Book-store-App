import mongoose from "mongoose";

const bookSchema=mongoose.Schema({
    name:String,
    price:Number,
    category:String,
    image:String,
    title:String ,
    type:String,
     rating: {
    type: Number,
    default: 0,
  },


  numReviews: {
    type: Number,
    default: 0,
  },



  reviews: [
  {
    userId: String,

    userName: String,

    rating: {
      type: Number,
      required: true,
    },

    comment: {
      type: String,
      required: true,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
],
})





const Book = mongoose.model("Book",bookSchema);



export default Book;

