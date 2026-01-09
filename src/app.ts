import express from 'express'
import { toNodeHandler } from "better-auth/node";
import cors from 'cors'
import { auth } from './lib/auth';
import { postRouter } from './modules/posts/post.router';
import { commentRouter } from './modules/comment/comment.router';

const app = express();

app.use(cors({
    origin : process.env.APP_URL || "http://localhost:4000",
    credentials : true
}))

app.all('/api/auth/{*any}', toNodeHandler(auth));

app.use(express.json())
app.use("/posts", postRouter)
app.use("/comments", commentRouter)

app.get("/", (req, res) => {
    res.send("Hello, World")
})

export default app
