import Newsletter from "../modal/newsletter.model.js";

export const subscribeNewsletter = async (req, res) => {
  try {

    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    // Check duplicate email
    const existingEmail = await Newsletter.findOne({ email });

    if (existingEmail) {
      return res.status(400).json({
        success: false,
        message: "Email already subscribed",
      });
    }

    const newSubscriber = new Newsletter({
      email,
    });

    await newSubscriber.save();

    res.status(201).json({
      success: true,
      message: "Subscribed successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};