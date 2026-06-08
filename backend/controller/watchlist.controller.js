import Watchlist from "../modal/watchlist.model.js";

export const addToWatchlist = async (
  req,
  res
) => {
  try {

    const {
      userId,
      bookId,
    } = req.body;

    const existing =
      await Watchlist.findOne({
        userId,
        bookId,
      });

    if (existing) {
      return res.status(400).json({
        message:
          "Book already in watchlist",
      });
    }

    const watchlist =
      await Watchlist.create({
        userId,
        bookId,
      });

    res.status(201).json({
      success: true,
      watchlist,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message:
        "Internal server error",
    });

  }
};

export const getWatchlist = async (
  req,
  res
) => {
  try {

    const watchlist =
      await Watchlist.find({
        userId:
          req.params.userId,
      }).populate("bookId");

    res.status(200).json({
      success: true,
      watchlist,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message:
        "Internal server error",
    });

  }
};

export const removeFromWatchlist =
  async (req, res) => {
    try {

      await Watchlist.findOneAndDelete({
        userId:
          req.params.userId,
        bookId:
          req.params.bookId,
      });

      res.status(200).json({
        success: true,
        message:
          "Removed from watchlist",
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Internal server error",
      });

    }
  };