import Newsletter from "../modal/newsletter.model.js";
import { logActivity } from "../utils/activityLogger.js";

export const getAllSubscribers = async (req, res) => {
  try {

    const subscribers = await Newsletter.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      subscribers,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch subscribers",
    });
  }
};


export const deleteSubscriber = async (req, res) => {
  try {

    const { id } = req.params;

    console.log("Deleting ID:", id);

    const subscriber =
      await Newsletter.findByIdAndDelete(id);

    console.log("Deleted Subscriber:", subscriber);

    if (!subscriber) {

      return res.status(404).json({
        success: false,
        message: "Subscriber not found",
      });
    }

    await logActivity(
      "📧 Deleted Subscriber",
      subscriber.email
    );

    console.log("Activity Logged");

    res.status(200).json({
      success: true,
      message: "Subscriber deleted successfully",
    });

  } catch (error) {

    console.log(
      "DELETE ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to delete subscriber",
    });
  }
};