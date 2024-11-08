import { CommentDao } from "./dao/CommentDao";
import { LikeDao } from "./dao/LikeDao";
import { InMemoryDatastore } from "./memorydb";
import { PostDao } from "./dao/PostDao";
import { UserDao } from "./dao/UserDao";
import { SqlDataStore } from "./sql";

// Define the Datastore interface
export interface Datastore extends UserDao, PostDao, LikeDao, CommentDao {}

// Export `db` so it can be used in other modules
export let db: Datastore;

export async function initDb() {
    // Initialize `db` with the chosen datastore implementation
    // db = new InMemoryDatastore();
    db = await new SqlDataStore().openDb();
}
