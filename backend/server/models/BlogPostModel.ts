import mongoose, { Schema, Document } from 'mongoose';

interface BlogPost extends Document {
  title: string;
  description: string;
  image: string;
  category: string;
  createdAt: Date;
}

const BlogPostSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true }, 
  category: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const BlogPostModel = mongoose.model<BlogPost>('BlogPost', BlogPostSchema);
export default BlogPostModel;
