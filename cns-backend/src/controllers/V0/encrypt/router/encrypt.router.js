var express = require('express');
var CryptoJS = require('crypto-js');
var pad = require('one-time-pad');
const router = express.Router();


router.post('/', (req, res) => {
  
    const data = req.body;
    const userText = data.messageTxt;
    const encryptionKey = data.key;
    const algoType = data.algoType;
    console.log(req.params)

    if (algoType == "AES") {
        // console.log('about to encrypt...')
        var cipherText = CryptoJS.AES.encrypt(userText, 'encryptionKey 123').toString();
        res.status(200).send(cipherText);
        res.end()
    }
    else if (algoType == "3DES") {
        var cipherText  = CryptoJS.TripleDES.encrypt(userText, encryptionKey).toString();
        res.status(200).send(cipherText);
    }
    else if (algoType == "OTP") {
        // console.log('opt now...');
        var encryptedMessage = pad.encrypt(userText, encryptionKey);
        res.status(200).send(encryptedMessage)

    }
});

module.exports = router;