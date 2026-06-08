import Book from "../modal/book.modal.js"
import { logActivity } from "../utils/activityLogger.js";

export const getBook=async(req,res)=> {
    try {
        const book=await Book.find()
        res.status(200).json(book)
    } catch (error) {
        console.log("Error: ",error)
        
        res.status(500).json({ message: "Internal server error" })
        
    }
}

export const addBook = async(req, res) => {
    try {
        const { name, title, price, category,  type , image } = req.body;

        // Validation
        if (!name || !title || price === undefined || !category || !image) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newBook = new Book({
            name,
            title,
            price,
            category,
            type,
            image
        });

        await newBook.save();

      await logActivity(
  "✔ Added",
  newBook.title
);
        res.status(201).json({ 
            message: "Book added successfully", 
            book: newBook 
        });
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const updateBook = async(req, res) => {
    try {
        const { id } = req.params;
        const { name, title, price, category, type , image } = req.body;

        // Validation
        if (!name || !title || price === undefined || !category || !image) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const updatedBook = await Book.findByIdAndUpdate(
            id,
            { name, title, price, category, type, image },
            { new: true }
        );

        if (!updatedBook) {
    return res.status(404).json({
      message: "Book not found"
    });
}

await logActivity(
  "✏️ Updated",
  updatedBook.title
);

        res.status(200).json({ 
            message: "Book updated successfully", 
            book: updatedBook 
        });
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const deleteBook = async(req, res) => {
    try {
        const { id } = req.params;

        const deletedBook = await Book.findByIdAndDelete(id);

        if (!deletedBook) {
    return res.status(404).json({
      message: "Book not found"
    });
}

await logActivity(
  "🗑️ Deleted",
  deletedBook.title
);

        res.status(200).json({ 
            message: "Book deleted successfully", 
            book: deletedBook 
        });
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
};






export const getCategories = async (
  req,
  res
) => {
  try {

    const categories =
      await Book.distinct("category");

    res.status(200).json({
      success: true,
      categories,
    });

  } catch (error) {

    console.log("Error:", error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};






export const addReview = async (
  req,
  res
) => {
  try {

    const {
      userId,
      userName,
      rating,
      comment,
    } = req.body;

    const book =
      await Book.findById(
        req.params.bookId
      );

    if (!book) {
      return res.status(404).json({
        message: "Book Not Found",
      });
    }

    const existingReview =
      book.reviews.find(
        (review) =>
          review.userId === userId
      );

    if (existingReview) {

      existingReview.rating =
        Number(rating);

      existingReview.comment =
        comment;

    } else {

      book.reviews.push({
        userId,
        userName,
        rating: Number(rating),
        comment,
      });

    }

    book.numReviews =
      book.reviews.length;

    book.rating =
      book.reviews.reduce(
        (acc, item) =>
          acc + item.rating,
        0
      ) / book.reviews.length;

    await book.save();

    res.status(200).json({
      success: true,
      message:
        existingReview
          ? "Review Updated Successfully"
          : "Review Added Successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }
};






export const getSingleBook = async (
  req,
  res
) => {
  try {

    const book =
      await Book.findById(
        req.params.bookId
      );

    if (!book) {
      return res.status(404).json({
        message: "Book Not Found",
      });
    }

    res.status(200).json(book);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }
};