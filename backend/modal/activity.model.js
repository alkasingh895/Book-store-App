import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
  {
    text: String,
  },
  { timestamps: true }
);

const Activity = mongoose.model(
  "Activity",
  activitySchema
);

export default Activity;