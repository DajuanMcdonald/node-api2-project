const express = require('express');
const router = express.Router();



router.get('/:id/comments', (req, res) => {
    res.status(200).send('<p>Server-Side Routing with Express</p>');
});


module.exports = router;

//This file is for testing only 