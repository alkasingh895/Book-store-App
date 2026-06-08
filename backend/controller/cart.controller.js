import Cart from "../modal/cart.model.js";
import User from "../modal/user_modal.js";
import Book from "../modal/book.modal.js";
import mongoose from "mongoose";

export const addToCart = async (req, res) => {
  try {
    const { userId, bookId } = req.body;

    // Validation: Check if userId and bookId are provided
    if (!userId || !bookId) {
      return res.status(400).json({
        success: false,
        message: "userId and bookId are required",
      });
    }

    // Validation: Check if they are valid MongoDB ObjectIds
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid userId format",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(bookId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid bookId format",
      });
    }

    // Verify user exists
    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Verify book exists
    const bookExists = await Book.findById(bookId);
    if (!bookExists) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    const existingItem = await Cart.findOne({
      userId,
      bookId,
    });

    if (existingItem) {
      existingItem.quantity += 1;

      await existingItem.save();

      return res.status(200).json({
        success: true,
        message: "Quantity updated",
        cartItem: existingItem,
      });
    }

    const cartItem = await Cart.create({
      userId,
      bookId,
      quantity: 1,
    });

    res.status(201).json({
      success: true,
      message: "Book added to cart",
      cartItem,
    });

  } catch (error) {
    console.error("Cart add error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to add to cart",
      error: error.message,
    });
  }
};


// GET CART
export const getCart = async (
  req,
  res
) => {
  try {

    const { userId } = req.params;

    // Validation: Check if userId is provided
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "userId is required",
      });
    }

    // Validation: Check if it's a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid userId format",
      });
    }

    // Verify user exists
    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const cartItems =
      await Cart.find({
        userId,
      }).populate("bookId");

    res.status(200).json({
      success: true,
      count: cartItems.length,
      cartItems,
    });

  } catch (error) {

    console.error("Cart fetch error:", error);

    res.status(500).json({
      success: false,
      message:
        "Failed to fetch cart",
      error: error.message,
    });
  }
};

export const removeFromCart = async (
  req,
  res
) => {
  try {

    const { id } = req.params;

    await Cart.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Item removed from cart",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to remove item",
    });
  }
};

// UPDATE QUANTITY
export const updateQuantity = async (req, res) => {
  try {
    const { userId, bookId, quantity } = req.body;

    // Validation
    if (!userId || !bookId || quantity === undefined) {
      return res.status(400).json({
        success: false,
        message: "userId, bookId, and quantity are required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(bookId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid userId or bookId format",
      });
    }

    if (quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be at least 1",
      });
    }

    const cartItem = await Cart.findOneAndUpdate(
      { userId, bookId },
      { quantity },
      { new: true }
    );

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Quantity updated",
      cartItem,
    });

  } catch (error) {
    console.error("Cart update error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update quantity",
      error: error.message,
    });
  }
};


// CLEAR CART

export const clearCart = async (req, res) => {
  try {
    const { userId } = req.params;

    await Cart.deleteMany({ userId });

    res.status(200).json({
      success: true,
      message: "Cart cleared successfully",
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to clear cart",
    });
  }
};




