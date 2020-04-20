const express = require('express');
const router = express.Router();
const db = require('../../data/db');

router.use(express.json());

router.get('/', (req, res) => {
    db.find()
    .then(posts => {
        res.status(200).json(posts)
    })
    .catch(err => {
        res.status(500).json({error: "The posts information could not be retrieved."})
    })
})