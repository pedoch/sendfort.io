import { Schema, model, models } from "mongoose";

export interface IContent {
  content: string;
  slug: string;
  expiresAt: Date;
}

const contentSchema = new Schema<IContent>({
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

const Content = models.Content || model<IContent>("Content", contentSchema);

export default Content;
