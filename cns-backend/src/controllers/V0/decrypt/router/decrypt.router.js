var express = require('express');
var CryptoJS = require('crypto-js');
var pad = require('one-time-pad');

const router = express.Router();

router.post('/', (req,res) => {
    const data = req.body;
    console.log(data);
    const cipherText =data.cypherText;
    const decryptionKey = data.key;
    const algoType = data.algoType;
 console.log(cipherText,decryptionKey)
    if (algoType == "AES") {
        // console.log('decrypting...')
        const cryptkey = CryptoJS.enc.Utf8.parse(decryptionKey);
        const crypted = CryptoJS.enc.Base64.parse(cipherText);

        var decrypt = CryptoJS.AES.decrypt({ciphertext: crypted}, cryptkey, {
        iv: CryptoJS.enc.Hex.parse('00000000000000000000000000000000'),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

        // var decrypted = CryptoJS.AES.decrypt(cipherText, CryptoJS.enc.Base64.parse(decryptionKey),
        //   { iv: CryptoJS.enc.Hex.parse('00000000000000000000000000000000') });;
        // var originalText = decrypted.toString(CryptoJS.enc.Utf8);
        res.status(200).send(originalText);
    }
    else if (algoType == "3DES") {
        // console.log('triple des')
        var bytes  = CryptoJS.TripleDES.decrypt(cipherText, decryptionKey);
        var originalText = bytes.toString(CryptoJS.enc.Utf8);
        res.status(200).send(originalText);
    }
    else if(algoType == "OTP") {
        // console.log('OTP');
        const decryptedMessage = pad.decrypt(cipherText, decryptionKey);
        res.status(200).send(decryptedMessage);

    }
});

module.exports = router;