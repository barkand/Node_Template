import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  wallet: { type: String, required: true, unique: true },
  username: { type: String },
  avatar: { type: Boolean },
  score: { type: Number },
});

export default mongoose.model("User", userSchema);
