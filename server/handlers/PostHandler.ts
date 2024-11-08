import { RequestHandler } from "express";
import { db } from "../datastore";
import { ExpressHandler, Post } from "../types";
import crypto from "crypto";
import { CreatePostRequest, CreatePostResponse, ListPostRequest, ListPostResponse } from "../api";


export const listPostHandler : RequestHandler<ListPostRequest,ListPostResponse> = async (req, res) => {
    res.send({posts: await db.listPosts()});
};

export const createPostHandler: ExpressHandler<CreatePostRequest, CreatePostResponse> = (req, res) => {
    if (!req.body.title || !req.body.url || !req.body.userId) {
        res.sendStatus(400);
        return;
    }

    //TODO: validate user exists
    //TODO: get User Id from session
    //TODO: validate title and url are non-empty
    //TODO: validate url is new, otherwise add +1 to existing post
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
