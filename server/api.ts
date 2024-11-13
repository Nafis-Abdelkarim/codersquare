import { Post, User } from "./types";
//Post APIs

export interface ListPostRequest {}
export interface ListPostResponse {
    posts: Post[];
}
export type CreatePostRequest = Pick<Post, "title" | "url" | "userId">;
export interface CreatePostResponse {}

export interface GetPostRequest {}
export interface GetPostResponse {
    post: Post;
}

export type SignUpRequest = Pick<User, 'email' | 'firstName' | 'lastName' | 'userName' | 'password'>;
export interface SignUpResponse {}

export interface SignInRequest {
    login: string; // username or password
    password: string;
}
export type SignInResponse = Pick<User, 'email' | 'firstName' | 'lastName' | 'userName' | 'Id'>;