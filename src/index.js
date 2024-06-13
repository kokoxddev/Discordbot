require('dotenv').config()
require('colors')
const Bot = require('./structures/Client.js');
(async () => new Bot())()
