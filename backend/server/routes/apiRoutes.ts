import express, { Router, Request, Response } from "express";
import multer from 'multer';
import { loginUser, registerUser } from "../controllers/userController";
import { createPost, deletePost, getAllPosts, searchPosts, updatePost } from "../controllers/postController";


const router: Router = express.Router();
router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/search", searchPosts);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.route("/posts").post(upload.single("image"), createPost) .get(getAllPosts);

router.route('/posts/:id').put(updatePost).delete(deletePost);

router.post("/search", searchPosts);

export default router;
