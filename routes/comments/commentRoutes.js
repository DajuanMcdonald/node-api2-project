const express = require('express');
const router = express.Router();
const db = require('../../data/db');



router.get('/:id/comments', (req, res) => {
    const id = req.params.id;
    if(!id) {
        res.status(404).json({message: "The post with the specified ID does not exist."})
    } else {
        db.findCommentById(id)
        .then( comment => {
            res.status(200).json(comment)
        }).catch(err => res.status(500).json({message: "The comments information could not be retrieved."}))
    }
    res.status(200).send('<p>Server-Side Routing with Express</p>');
});


module.exports = router;

//This file is for testing only 