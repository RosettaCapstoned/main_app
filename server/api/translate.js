const express = require('express');
const router = express.Router();
const translate = require('translate');
translate.engine = 'google';
translate.key = process.env.GOOGLE_KEY;

console.log('GOOGLE_KEY is: ', process.env.GOOGLE_KEY);
module.exports = router;


router.get('/', (req, res, next)=> {
    res.send('hello world');
})

router.post('/', (req, res, next)=> {
    const { message, to, from } = req.body;
    // console.log('the message is: ', message);

    translate(message, {to, from})
    .then(translation => {
        // console.log('the translation is: ',translation);
        res.send(translation);
    });
})