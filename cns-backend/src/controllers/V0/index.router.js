var express = require('express');
var decryptRouter = require('./decrypt/router/decrypt.router.js');
var encryptRouter = require('./encrypt/router/encrypt.router.js');

const router = express.Router();

router.use('/decrypt', decryptRouter);
router.use('/encrypt', encryptRouter);

module.exports = router;