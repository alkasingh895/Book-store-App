import Order from "../modal/order.model.js";
import Book from "../modal/book.modal.js";

export const getTopSellingBooks =
  async (req, res) => {
    try {

      const books =
        await Order.aggregate([

          {
            $unwind: "$items",
          },

          {
            $group: {
              _id: "$items.bookId",

              totalSold: {
                $sum:
                  "$items.quantity",
              },
            },
          },

          {
            $sort: {
              totalSold: -1,
            },
          },

          {
            $limit: 10,
          },
        ]);

      const result =
        await Book.populate(
          books,
          {
            path: "_id",
            select: "name",
          }
        );

      res.status(200).json({
        success: true,
        books: result,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,
      });

    }
  };