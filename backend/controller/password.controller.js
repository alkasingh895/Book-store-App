import User from "../modal/user_modal.js";

import bcryptjs from "bcryptjs";

export const forgotPassword = async (
  req,
  res
) => {

  try {

    const { email, newPassword } = req.body;

    const user = await User.findOne({ email });

    if (!user) {

      return res.status(404).json({
        message: "User not found",
      });
    }

    const hashedPassword =
      await bcryptjs.hash(newPassword, 10);

    user.password = hashedPassword;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};