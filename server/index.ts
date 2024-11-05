import express, { RequestHandler } from 'express'
import { createPostHandler, listPostHandler } from './handlers/PostHandler'

const app = express();

app.use(express.json());

const posts : any = [];

const requestLoggerMiddleware : RequestHandler = (req, res, next) => {
  console.log('New request:', req.path, '-body:', req.body);
  next();
}

app.use(requestLoggerMiddleware)

app.get('/posts', listPostHandler);

app.post('/posts', createPostHandler)


app.listen(3000);