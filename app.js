/* eslint quotes: ["error", "single", { "allowTemplateLiterals": true }]*/
const http = require('http');
const Bot = require('messenger-bot');

require('dotenv').config();

const bot = new Bot({
  token: process.env.PAGE_TOKEN,
  verify: process.env.VERIFY_TOKEN
});

bot.on('error', (err) => {
  console.log('ERROR!! ', err.message);
});

bot.on('message', (payload, reply) => {
  const text = 'Message: ' + payload.message.text;

  bot.getProfile(payload.sender.id, (err, profile) => {
    if (err) throw err;

    reply({ text }, () => {
      if (err) {
        console.log('ERROR: ', err);
        throw err;
      }
      console.log(`Echoed back to ${profile.firstname} ${profile.lastname}: ${text}`);
    });
  });
});

const port = process.env.PORT || 8000;
http.createServer(bot.middleware()).listen(port);
