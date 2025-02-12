import { Request, Response } from "express";
import BlogPostModel from "../models/BlogPostModel";

export const createPost = async (req: Request, res: Response)=>{
  const { title, description, category } = req.body;
  const image = req.file?.filename;

  try {
    if (!title || !description || !image || !category) {
      res.status(400).json({ success: false, message: "All fields are required" });
      return;
    }

    const newPost = new BlogPostModel({ title, description, image, category });
    await newPost.save();

    res.status(201).json({
      success: true,
      message: "Blog post created successfully",
      post: newPost,
    });
  } catch (error: unknown) {
    res.status(500).json({ success: false, message: error});
  }
};

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await BlogPostModel.find();
    res.status(200).json({ success: true, posts });
  } catch (error: unknown) {
    res.status(500).json({ success: false, message: error  });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  const { title, description, image, category } = req.body;
  const postId = req.params.id;

  try {
    const post = await BlogPostModel.findById(postId);

    if (!post) {
      res.status(404).json({ success: false, message: 'Post not found' });
      return;
    }

    post.title = title || post.title;
    post.description = description || post.description;
    post.image = image || post.image;
    post.category = category || post.category;

    await post.save();

    res.status(200).json({
      success: true,
      message: 'Blog post updated successfully',
      post,
    });
  } catch (error: unknown) {
    res.status(500).json({ success: false, message: error });
  }
};

export const deletePost = async (req: Request, res: Response)=> {
  const postId = req.params.id;

  try {
    const deletedPost = await BlogPostModel.findByIdAndDelete(postId);

    if (!deletedPost) {
      res.status(404).json({ success: false, message: 'Post not found' });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Blog post deleted successfully',
    });
  } catch (error: unknown) {
    res.status(500).json({ success: false, message: error });
  }
};


export const searchPosts = async (req: Request, res: Response)  => {
  try {
    const { query } = req.body;  

    if (!query) {
       res.status(400).json({  success: true, message: "Search query is required" });
    }

    const searchResults = await BlogPostModel.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } }
      ]
    });

    res.json(searchResults);
  } catch (error) {
    res.status(500).json({ success: false, message:  error });
  }
};

