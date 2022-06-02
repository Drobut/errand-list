"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require("crypto");
const passwordBuffer = 'teste';
function hashGenerator() {
    const password = crypto.createHmac('sha256', passwordBuffer).digest('hex');
    console.log(password);
}
hashGenerator();
//# sourceMappingURL=password-manager.js.map