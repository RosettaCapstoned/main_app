//Functionality relocated to main app.js Socket.io chain

const express = require('express');
const router = express.Router();
const translate = require('translate');
translate.engine = 'google';
translate.key = process.env.GOOGLE_KEY;

module.exports = router;


router.get('/', (req, res, next)=> {
    res.send('hello world');
})

router.post('/', (req, res, next)=> {
    const { message, settings } = req.body.translateBody;

    translate(message, settings)
    .then(translation => {
        // console.log('the translation is: ',translation);
        res.send(translation);
    });
})