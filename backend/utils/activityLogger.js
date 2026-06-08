import Activity from "../modal/activity.model.js";

export const logActivity = async (
  action,
  item
) => {
  try {

    const text = `${action} ${item}`;

    await Activity.create({ text });

  } catch (error) {

    console.log(error);
  }
};