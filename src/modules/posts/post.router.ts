import express from 'express';

const router = express.Router();

router.post('/create', (req, res) => {
    res.send("Create a new post")
})

export const postRouter = router;