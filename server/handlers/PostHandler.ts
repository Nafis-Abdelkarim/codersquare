import { RequestHandler } from "express";
import { db } from "../datastore";
import { ExpressHandler, Post } from "../types";
import crypto from "crypto";


export const listPostHandler : RequestHandler<{},{}> = (req, res) => {
    res.send({posts: db.listPosts()});
};

type CreatePostRequest = Pick<Post, "title" | "url" | "userId">;

interface CreatePostResponse {}

export const createPostHandler: ExpressHandler<CreatePostRequest, CreatePostResponse> = (req, res) => {
    if (!req.body.title || !req.body.url || !req.body.userId) {
        res.sendStatus(400);
        return;
    }

    const post: Post = {
        id: crypto.randomUUID(),
        title: req.body.title,
        url: req.body.url,
        userId: req.body.userId,
        postedAt: Date.now()
    };

    db.createPost(post);
    res.sendStatus(200);
};
