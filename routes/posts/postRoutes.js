const express = require('express');
const router = express.Router();
const db = require('../../data/db');

router.use(express.json());
/* 
@db : data folder; contains a database populated with test `posts`.
@route : /path/:key/ ; /:id
@resource/path : /path/value/ ; /3
@
*/

//When the client makes a `GET` request to `/api/posts`:
router.get('/', (req, res) => {
    db.find()
    .then(posts => {
        res.status(200).json(posts)
    })
    .catch(err => {
        res.status(500).json({error: "The posts information could not be retrieved."})
    })
})

//When the client makes a `GET` request to `/api/posts/:id`:
/*
* @post: post with id
* 
*/
router.get('/:id', (req, res) => {
    const id = req.params.id;
    !id ? res.status(404).json({message: "The post with the specified ID does not exist."}) :
    
    db.findById(id)
    // or post with id (postWithId)
    .then(post => {
        res.status(200).json(post)
    })
    .catch(err => {
        res.status(500).json({error: "The posts information could not be retrieved."})
    })
})