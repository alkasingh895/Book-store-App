import Book from "../modal/book.modal.js";
import Contact from "../modal/contact.model.js";
import Newsletter from "../modal/newsletter.model.js";
import Order from "../modal/order.model.js";
export const getDashboardStats = async (req, res) => {
  try {

    const totalBooks = await Book.countDocuments();

    const totalMessages = await Contact.countDocuments();

    const totalSubscribers = await Newsletter.countDocuments();



 const totalOrders =
  await Order.countDocuments();

const pendingOrders =
  await Order.countDocuments({
    status: {
      $nin: [
        "Cancelled",
        "Delivered",
      ],
    },
  });

const revenueData =
  await Order.aggregate([
    {
      $group: {
        _id: null,
        totalRevenue: {
          $sum: "$totalAmount",
        },
      },
    },
  ]);

const totalRevenue =
  revenueData[0]?.totalRevenue || 0;   


  const latestBook = await Book.findOne().sort({
  createdAt: -1,
});

const latestMessage = await Contact.findOne().sort({
  createdAt: -1,
});

const latestSubscriber = await Newsletter.findOne().sort({
  createdAt: -1,
});




    res.status(200).json({
  success: true,

  stats: {
    totalBooks,
    totalMessages,
    totalSubscribers,
    totalOrders,
  pendingOrders,
  totalRevenue,
  },

  recentActivity: {
    latestBook,
    latestMessage,
    latestSubscriber,
  },
});

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to load dashboard stats",
    });
  }
};