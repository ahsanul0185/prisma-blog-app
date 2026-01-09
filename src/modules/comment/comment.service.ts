import type { CommentStatus } from "../../../generated/prisma/enums"
import { prisma } from "../../lib/prisma"

const createComment = async (payload : {
    content : string,
    authorId : string,
    postId : string,
    parentId? : string
}) => {

    await prisma.post.findUniqueOrThrow({
        where : {
            id : payload.postId
        }
    })

    if (payload.parentId) {
        await prisma.comment.findUniqueOrThrow({
            where : {
                id : payload.parentId
            }
        })
    }



   const result = await prisma.comment.create({
    data : payload
   })

   return result
}


const getCommentById = async (id : string) => {
    const result = await prisma.comment.findUnique({
        where : {
            id
        },
        include : {
            post : {
                select : {
                    id : true,
                    title : true,
                    views : true
                }
            }
        }
    })

    return result
}


const getCommentsByAuthor = async (authorId : string) => {

    const result = await prisma.comment.findMany({
        where : {
            authorId
        },
        orderBy : {createdAt : "desc"},
        include : {
            post : {
                select : {
                    id : true,
                    title : true
                }
            }
        }
    }) 

    return result
}

const deleteComment = async (commentId : string, authorId : string) => {
    const commentData = await prisma.comment.findFirst({
        where : {
            id : commentId,
            authorId
        },
        select : {
            id : true
        }
    })

    if(!commentData) {
        throw new Error("Comment not found")
    }

    const result = await prisma.comment.delete({
        where : {
            id : commentId
        }
    })

    return result

}


const updateComment = async (commentId : string, data : {content ?: string, status ?: CommentStatus}, authorId : string) => {
        const commentData = await prisma.comment.findFirst({
        where : {
            id : commentId,
            authorId
        },
        select : {
            id : true
        }
    })

    if(!commentData) {
        throw new Error("Comment not found")
    }

    const result = await prisma.comment.update({
        where : {
            id : commentId,
            authorId
        },
        data
    })

    return result
}


const moderateComment = async (id: string, data : {status : CommentStatus}) => {
    const commentData = await prisma.comment.findUniqueOrThrow({
        where : {
            id
        },
        select : {
            id : true,
            status : true
        }
    });

    if (commentData.status === data.status) {
        throw new Error(`Your provided status (${data.status}) is already up to date.`)
    }

    return await prisma.comment.update({
        where : {
            id
        },
        data
    })
}


export const commentService = {
    createComment,
    getCommentById,
    getCommentsByAuthor,
    deleteComment,
    updateComment,
    moderateComment
}