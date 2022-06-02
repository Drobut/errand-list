import * as crypto from 'crypto';

const passwordBuffer = '';
let password = '';

function hashGenerator() {
  password = crypto.createHmac('sha256', passwordBuffer).digest('hex');
}

hashGenerator();
console.log(password);
