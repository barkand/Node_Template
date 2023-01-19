import mongoose from "mongoose";

const Schema = mongoose.Schema;

const notificationsSchema = new Schema({
  user_id: { type: String },
  product_id: { type: Number },
  seen: { type: Boolean },
});

export default mongoose.model("Notification", notificationsSchema);
