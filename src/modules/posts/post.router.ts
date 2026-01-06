import express from "express";
import { PostController } from "./post.controller";
import auth, { UserRole } from "../../middlewares/auth";

const router = express.Router();


router.get("/", PostController.getAllPosts);

router.post(
  "/create",
  auth(UserRole.ADMIN, UserRole.USER),
  PostController.createPost
);


export const postRouter = router;
