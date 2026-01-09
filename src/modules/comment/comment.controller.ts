import type { Request, Response } from "express";
import { commentService } from "./comment.service";

const createComment = async (req: Request, res: Response) => {
  try {

    const user = req.user;
    req.body.authorId = user?.id

    const result = await commentService.createComment(req.body);

    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({
      message: "Comment creation failed",
      error,
    });
  }
};

const getCommentById = async (req: Request, res: Response) => {
  try {

    const {commentId} = req.params

    const result = await commentService.getCommentById(commentId as string);

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      message: "get comment failed",
      error,
    });
  }
};


const getCommentsByAuthor = async (req: Request, res: Response) => {
  try {

    const {authorId} = req.params

    const result = await commentService.getCommentsByAuthor(authorId as string);

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      message: "get comments by author failed",
      error,
    });
  }
};

const deleteComment = async (req: Request, res: Response) => {
  try {

    const user = req.user;
    const {commentId} = req.params;
    
    const result = await commentService.deleteComment(commentId as string, user?.id as string);

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      message: "comment delete failed",
      error,
    });
  }
};

const updateComment = async (req: Request, res: Response) => {
  try {

    const user = req.user;
    const {commentId} = req.params;
    
    const result = await commentService.updateComment(commentId as string, req.body, user?.id as string);

    res.status(200).json(result);
  } catch (error) {
    console.log(error)
    res.status(400).json({ 
      message: "comment update failed",
      error,
    });
  }
};


const moderateComment = async (req: Request, res: Response) => {
  try {

    const {commentId} = req.params;
    const result = await commentService.moderateComment(commentId as string, req.body);

    res.status(200).json(result);
  } catch (e) {
    const errorMessage = (e instanceof Error) ? e.message : "comment update failed";
    res.status(400).json({ 
      message: errorMessage,
      details : e,
    });
  }
};



export const CommentController = {
  createComment,
  getCommentById,
  getCommentsByAuthor,
  deleteComment,
  updateComment,
  moderateComment
};