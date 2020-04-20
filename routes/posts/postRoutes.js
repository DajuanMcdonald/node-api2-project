const express = require('express');
const router = express.Router();
const db = require('../../data/db');

router.use(express.json());


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
router.get('/:id', (req, res) => {
    const id = req.params.id;
    !id ? res.status(404).json({message: "The post with the specified ID does not exist."}) :
    
    db.findById(id)
    .then(post => {
        res.status(200).json(post)
    })
    .catch(err => {
        res.status(500).json({error: "The posts information could not be retrieved."})
    })
})