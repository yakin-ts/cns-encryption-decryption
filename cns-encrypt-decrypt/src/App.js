import { useState} from 'react';
import axios from 'axios';
import './styles/styles.scss';

 



export default function App() {
// Encryption states
  const [message, setMessage] = useState('');
  const [encAlgorithm, setEncAlgorithm] = useState('');
  const [encryptionKey, setEncryptionKey] = useState('');
  const [encryptionResult, setEncryptionResult] = useState('');
// Decryption states
const [cypherTxt, setCypherTxt ]= useState('');
const [decAlgorithm, setDecAlgorithm] = useState('');
const [decryptionKey, setDecryptionKey] = useState('');
const [decryptionResult, setDecryptionResult] = useState('');

  const handleEncrypt = (e) => {
    e.preventDefault();
    const data = {
      messageTxt: message,
      algoType: encAlgorithm,
      key: encryptionKey
    }

    axios
      .post("http://localhost:8080/api/v0/encrypt", data)
      .then(res => setEncryptionResult(res.data))
      .catch(err => console.log(err));
  }

  const handleDecrypt = (e) => {
    e.preventDefault();
    const data = {
      cypherText: cypherTxt,
      algoType: decAlgorithm,
      key: decryptionKey
    }

    axios
      .post("http://localhost:8080/api/v0/decrypt", data)
      .then((res) => {
        console.log(res);
        setDecryptionResult(res.data) })
      .catch(err => console.log(err));
  }
  return (
    <div className='app__container' >
     <form action="#" className='app__encryption'>
      <div className='app__operation-title'>Message To Encrypt</div>
        <textarea rows='6' cols='70' className='app__msg-content' required
        onChange={(e) => setMessage(e.target.value) } value={message}
        ></textarea>
        <div className='app__select-algo'>
          <label htmlFor='algos' className='app__select-algo-title'>Choose Algorithm</label>
          <select id='algos' className='app__select-algo-options' value={ encAlgorithm} onChange={(e)=> setEncAlgorithm(e.target.value)}>
            <option vlue='OTP'>OTP</option>
            <option vlue='tripleDES'>3DES</option>
            <option vlue='AES'>AES</option>
          </select>
        </div>
      <div className='app__operation-key'>
        <label className='app__operation-key__title'>Encryption Key</label>
        <input type='text' className='app__operation-key__content' required
        onChange={(e)=>setEncryptionKey(e.target.value)} value={encryptionKey}
        />
      </div>
      <div className='app__operation-btns'>
          <button type='submit' className='app__operation-enc-btn'
          onClick={(e)=> handleEncrypt(e)}>
            Encrypt
            </button>
        <button className='app__operation-copy-btn' onClick="copyToClipBoard()">Copy Encryption</button>
      </div>
      <textarea className='app__operation-result' onChange={(e)=> setEncryptionResult(encryptionResult)} value={encryptionResult} ></textarea>
     </form>
     <form className='app__decryption'>
       <div className='app__operation-title'>Message To Decrypt</div>
        <textarea rows='6' cols='70' className='app__msg-content' required
        onChange={(e) => setCypherTxt(e.target.value)} value={cypherTxt}></textarea>
        <div className='app__select-algo'>
          <label htmlFor='algos' className='app__select-algo-title'>Choose Algorithm</label>
          <select id='algos' className='app__select-algo-options' value={decAlgorithm} onChange={(e)=> setDecAlgorithm(e.target.value)}>
            <option vlue='OTP'>OTP</option>
            <option vlue='tripleDES'>3DES</option>
            <option vlue='AES'>AES</option>
          </select>
        </div>
      <div className='app__operation-key'>
        <label className='app__operation-key__title'>Decryption Key</label>
          <input type='text' className='app__operation-key__content' required
            onChange={(e) => setDecryptionKey(e.target.value)} value={ decryptionKey}/>
      </div>
      <div className='app__operation-btns'>
          <button type='submit' className='app__operation-enc-btn'
          onClick={(e) => handleDecrypt(e)}>Decrypt</button>
        <button className='app__operation-copy-btn' onClick="copyToClipBoard()" >Copy Decryption</button>
      </div>
      <textarea className='app__operation-result' onChange={(e) => setDecryptionResult(decryptionResult)} value={decryptionResult} ></textarea>
     </form>
     </div>
  );
}
