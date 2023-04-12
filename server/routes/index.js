/**
* App routes definitions.
*/
'use strict';

let express = require('express');
let router = express.Router();

const userRouter = require('./users');
const productRouter = require('./products');

router.use(userRouter);
router.use(productRouter);

// To confirm setup only.
router.get('/', function(req, res) { return res.send('Hello world!'); });

module.exports = router;
