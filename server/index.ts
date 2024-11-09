import express, { ErrorRequestHandler, RequestHandler } from 'express'
import { createPostHandler, listPostHandler } from './handlers/PostHandler'
import asyncHandler from 'express-async-handler'
import { initDb } from './datastore'

(async ()=>{

await initDb();

const app = express();

app.use(express.json());

const posts : any = [];

const requestLoggerMiddleware : RequestHandler = (req, res, next) => {
  console.log('New request:', req.path, '-body:', req.body);
  next();
}

app.use(requestLoggerMiddleware)

app.get('/v1/posts', asyncHandler(listPostHandler));

app.post('/v1/posts', asyncHandler(createPostHandler));

const errorHandler : ErrorRequestHandler = (err, req, res, next) =>  {
  console.error('Uncaught exception:', err);
  res.status(500).send('Ooops, unexpected error occurs please try again');
}

app.use(errorHandler);


app.listen(3000);

})()