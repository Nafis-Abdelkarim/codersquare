import sqlite3 from 'sqlite3'
import { open, Database } from 'sqlite'
import { Datastore } from "..";
import { User, Post, Like, Comment } from "../../types";
import path from 'path';

export class SqlDataStore implements Datastore
{
    private db!: Database<sqlite3.Database, sqlite3.Statement>;

    public async openDb(){
        // open the database
    this.db = await open({
        filename: path.join(__dirname, 'codersquare.sqlite'),
        driver: sqlite3.Database
        })

        this.db.run('PRAGMA foreign_keys = ON;');
    
        await this.db.migrate({
            migrationsPath: path.join(__dirname, 'migrations'),
        });

        console.log("Database initialized.");

        return this;
    }

    async createUser(user: User): Promise<void> {
        await this.db.run(`INSERT INTO users (id, email, password, firstName, lastName, userName) VALUES (?,?,?,?,?,?)`,
        user.id,
        user.email,
        user.password,
        user.firstName, 
        user.lastName,
        user.userName
        );
    }
    getUserByEmail(email: string): Promise<User | undefined> {
        return this.db.get<User>(`SELECT * FROM users WHERE email = ?`, email);
    }
    getUserByUsername(username: string): Promise<User | undefined> {
        return this.db.get<User>(`SELECT * FROM users WHERE userName = ?`, username);
    }
    listPosts(): Promise<Post[]> {
        return this.db.all<Post[]>('SELECT * FROM Posts');
    }
    async createPost(post: Post): Promise<void> {
        await this.db.run(
            'INSERT INTO posts (id, title, url, postedAt, userId) VALUES (?,?,?,?,?)',
            post.id,
            post.title,
            post.url,
            post.postedAt,
            post.userId
        );
    }
    getPost(id: string): Promise<Post | undefined> {
        throw new Error("Method not implemented.");
    }
    deletePost(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    createLike(like: Like): Promise<void> {
        throw new Error("Method not implemented.");
    }
    createComment(comment: Comment): Promise<void> {
        throw new Error("Method not implemented.");
    }
    listComments(postId: string): Promise<Comment[]> {
        throw new Error("Method not implemented.");
    }
    deleteComment(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}