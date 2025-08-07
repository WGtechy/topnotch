// import NodeRSA from 'node-rsa';


const decriptData = (data, key)=>{
    // let keyPrivate = new NodeRSA(key);
    // let decrypt = keyPrivate.decrypt(data, 'utf8');
    // console.log(keyPrivate)
    // return decrypt
  }
  
  const encryptData = (data, key)=>{
    // let keyPrivate = new NodeRSA(key);
    // let decrypt = keyPrivate.encrypt(data, 'base64');
    // return decrypt
  }

  let pubRSA
  export {
    pubRSA,
    encryptData,
    decriptData
  }