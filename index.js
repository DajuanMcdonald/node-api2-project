const express = require('express');
const server = express();

const PORT = process.env.PORT || 5001;



server.use(express.json());


server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})