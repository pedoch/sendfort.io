import { Schema, model, models } from "mongoose";

const contentSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
});

const Content = models.Content || model("Content", contentSchema);

export default Content;
