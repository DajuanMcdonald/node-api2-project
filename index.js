const express = require('express');
const server = express();
const postsRoute = require('./routes/posts/postRoutes');
const commentRoute = require('./routes/comments/commentRoutes');

const PORT = process.env.PORT || 5001;

server.use(express.json());
server.use('/api/posts', postsRoute);
server.use('/api/comments', commentRoute);

server.use('/', (req, res) => {
    res.status(200).send(`<h1>Server-side Routing with Express</h1>`)
})


server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})


/** this file is standing up a Server with Express
 * @postRoute : endpoints that begin with `/api/posts`
 * @commentRoute : is for testing   only
 */