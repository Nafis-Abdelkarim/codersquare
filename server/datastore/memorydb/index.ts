import { Datastore } from "..";
import { Comment, Like, Post, User } from "../../types";

type NewType = void;

export class InMemoryDatastore implements Datastore {
    private users: User[] = [];
    private postes: Post[] = [];
    private comments: Comment[] = [];
    private likes: Like[] = [];

    createUser(user: User): void {
        this.users.push(user);
    }
    getUserByEmail(email: string): User | undefined {
        return this.users.find(u => u.email === email)
    }
    getUserByUsername(username: string): User | undefined {
        return this.users.find(u => u.username === username)
    }
    listPosts(): Post[] {
        return this.postes;
    }
    createPost(post: Post): void {
        this.postes.push(post)
    }
    getPost(id: string): Post | undefined {
        return this.postes.find(p => p.id === id)
    }
    deletePost(id: string): void {
        const index = this.postes.findIndex(p => p.id === id);
        if(index === -1){
            return;
        }
        this.postes.splice(index, 1);
    }
    createLike(like: Like): void {
        this.likes.push(like);
    }
    createComment(comment: Comment): void {
        this.comments.push(comment);
    }
    listComments(postId: string): Comment[] {
        return this.comments.filter(c => c.postId === postId)
    }
    deleteComment(id: string): void {
        const index = this.comments.findIndex(c => c.id === id);
        if(index === -1){
            return;
        }
        this.postes.splice(index, 1);
    }
    
}