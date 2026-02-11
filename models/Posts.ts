import mongoose, { Schema, model, models } from 'mongoose';

export interface IPost {
  _id?: string;
  title: string;
  content: string;
  author: mongoose.Types.ObjectId | string;
  tags?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

const PostSchema = new Schema<IPost>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  tags: [String],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Post = models.Post || model<IPost>('Post', PostSchema);

export default Post;
