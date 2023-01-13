const path = require('path');
const fs = require('fs');
const solc = require('solc');

const myInboxPath = path.resolve(__dirname, 'contracts', 'myInbox.sol');
const source = fs.readFileSync(myInboxPath, 'utf8');

module.exports = solc.compile(source, 1).contracts[':MyInbox'];
