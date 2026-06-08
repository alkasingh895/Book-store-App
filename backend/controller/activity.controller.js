import Activity from "../modal/activity.model.js";

export const getActivities = async (
  req,
  res
) => {

  try {

    const activities =
      await Activity.find()
        .sort({ createdAt: -1 })
        .limit(10);

    res.status(200).json(
      activities
    );

  } catch (error) {

    res.status(500).json({
      message:
        "Failed to fetch activities",
    });
  }
};