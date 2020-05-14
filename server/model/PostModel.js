import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50
    },
    contents: String,
    user: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50
    }
  },
  { timestamps: true }
);

postSchema.index({ Users: 1, title: 1 }, { unique: true });
const PostModel = mongoose.model("VueSamplePosts", postSchema);

export default PostModel;
