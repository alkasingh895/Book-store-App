import Contact from "../modal/contact.model.js";

import { logActivity }
from "../utils/activityLogger.js";

export const getAllMessages = async (
  req,
  res
) => {
  try {

    const messages =
      await Contact.find().sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      messages,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch messages",
    });
  }
};

export const deleteMessage = async (
  req,
  res
) => {
  try {

    const { id } = req.params;

    const message =
      await Contact.findByIdAndDelete(id);

    if (!message) {

      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    await logActivity(
      "🗑 Deleted Message",
      message.email
    );

    res.status(200).json({
      success: true,
      message: "Message deleted successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to delete message",
    });
  }
};