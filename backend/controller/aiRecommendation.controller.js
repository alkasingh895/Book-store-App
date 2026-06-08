import Book from "../modal/book.modal.js";

import {
  generateBookInsight,
} from "../ai/bookRecommendation.js";

export const getAIRecommendations =
  async (req, res) => {

    try {

      const { id } = req.params;

      const book =
        await Book.findById(id);

      if (!book) {

        return res.status(404)
          .json({
            success: false,
            message:
              "Book not found",
          });

      }

      const insight =
        await generateBookInsight(
          book
        );

      res.status(200).json({
        success: true,
        insight,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,
      });

    }

  };