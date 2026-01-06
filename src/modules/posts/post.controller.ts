import { Request, Response } from "express"
import { postService } from "./post.service"
import type { PostStatus } from "../../../generated/prisma/enums";
import paginationSortingHelper from "../../helpers/paginationSortingHelper";

const createPost = async (req : Request, res : Response) => {

    try {

        if (!req.user) {
            return res.status(401).json({
            message : "Unauthorized",
        })
        }

        const result = await postService.createPost(req.body, req.user.id);
        res.status(201).json(result)
    } catch (error) {
        res.status(400).json({
            message : "Post creation failed",
            error
        })
    }
}

const getAllPosts = async (req : Request, res : Response) => {
    try {

        const {search} = req.query;
        const searchString = typeof search === "string" ? search : undefined;
        
        const tags = req.query.tags ? (req.query.tags as string).split(",") : [];

        const isFeatured = req.query.isFeatured 
            ? req.query.isFeatured === "true"
            ? true : req.query.isFeatured === "false" ? false : undefined : undefined;

        const status = req.query.status as PostStatus | undefined;

        const authorId = req.query.authorId as string | undefined;



        const {page, limit, sortBy, sortOrder, skip} = paginationSortingHelper(req.query);
        
        const result = await postService.getAllPosts({search : searchString, tags, isFeatured, status, authorId, page, limit, skip, sortBy, sortOrder});
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({
            message : "Posts retrive failed",
            error
        })
    }
} 


const getPostById = async (req : Request, res : Response) => {
    try {
        const { id } = req.params;

        if (!id) {
            throw new Error("Post id is required")
        }

        const result = await postService.getPostById(id);
        res.status(200).json(result)
        
    } catch (error) {
         res.status(400).json({
            message : "Get post by id failed",
            error
        })
    }
}

export const PostController = {
    createPost,
    getAllPosts,
    getPostById
}

