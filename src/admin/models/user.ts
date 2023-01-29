import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  user_id: { type: String, required: true, unique: true },
  username: { type: String },
  avatar: { type: Boolean },
  score: { type: Number },
  active_code: { type: String },
  expire_code: { type: Date },
});

export default mongoose.model("User", userSchema);
