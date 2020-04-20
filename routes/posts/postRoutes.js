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
    const body = req.body;
    
    if(!body.title || !body.contents) {
        //cancel the request.
        
        //respond with HTTP status code `400` (Bad Request).
        res.status(400).json({errorMessage: "Please provide title and contents for the post."})
        .end();
    }
    console.log(req.body)

    db.insert(body)
    .then(post => {
       res.status(201).json(post) 
    })
    .catch(err => res.status(500).json({message: `Server error`}))
})

// When the client makes a `POST` request to `/api/posts/:id/comments`:
router.post('/:id/comments', (req, res) => {
    const body = req.body;
    const id = req.params.id;

    if(!id) {
        res.status(404).json({message: "The post with the specified ID does not exist."})
    } else if(!body.text) {
        res.status(400).json({errorMessage: "Please provide text for the comment."})

    } else {
        
        db.insertComment(body)
        .then(comment => {
             res.status(201).json(comment)
        })
        .catch( err => res.status(500).json({message: "There was an error while saving the post to the database"}))
    }


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
    const id = req.params.id;
    console.log('searching...')
    if (!id || id !== req.params.id) {
        console.log('searching failed...')
       
     res.status(404).json({message: 'The post with specified ID does not exist'})   

    } else {
        db.findById(id)

        .then(post => {
            
            res.status(200).json(post);
        })
        .catch(err => {
            res.status(500).json({error: "The posts information could not be retrieved."})
        })
    }
    // id !== req.params.id || !id ? res.status(404).json({message: "The post with the specified ID does not exist."}) :
    
    // or post with id (postWithId)
})


module.exports = router;