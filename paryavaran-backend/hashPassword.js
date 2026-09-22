// hashPassword.js
const bcrypt = require('bcrypt');

async function generateHash() {
  const password = 'Admin@1234'; // ye admin ka password
  const hash = await bcrypt.hash(password, 10); // 10 salt rounds
  console.log('Hashed Password:', hash);
}

generateHash();