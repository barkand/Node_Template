import mongoose from "mongoose";

const Schema = mongoose.Schema;

const notificationsSchema = new Schema({
  user_id: { type: String },
  message: { type: String },
  refer_id: { type: Number },
  refer_link: { type: String },
  seen: { type: Boolean },
  active: { type: Boolean },
});

export default mongoose.model("Notification", notificationsSchema);
