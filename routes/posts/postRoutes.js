const express = require('express');
const router = express.Router();
const db = require('../../data/db');

router.use(express.json());
/* 
@db : data folder; contains a database populated with test `posts`.
@route : /path/:key/ ; /:id
@resource/path : /path/value/ ; /3
@next() : Endpoint Specifications
*/

//When the client makes a `POST` request to `/api/posts`:
router.post('/', (req, res) => {
    const {body} = req.body;
    
    if(!body.title || !body.contents) {
        //cancel the request.
        res.end();
        //respond with HTTP status code `400` (Bad Request).
        res.status(400).json({errorMessage: "Please provide title and contents for the post."});
    }
    console.log(req.body)

    db.update(body)
    .then(post => {
       res.status(201).json(post) 
    })
    .catch(err => res.status(500).json({message: `Server error`}))
})

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
    const {id} = req.params.id;
    !id ? res.status(404).json({message: "The post with the specified ID does not exist."}) :
    
    db.findById(id)
    // or post with id (postWithId)
    .then(post => {
        
        res.status(200).json(post);
    })
    .catch(err => {
        res.status(500).json({error: "The posts information could not be retrieved."})
    })
})


module.exports = router;