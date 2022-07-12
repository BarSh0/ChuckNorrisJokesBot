const fs = require("fs/promises");
const path = require("path");

//read md file with help message
async function getHelp(ctx) {
  const help = `
<strong>Welcome to the Chuck Norris Jokes Bot</strong>

Here you can get jokes of Chuck Norris from <b>101 Chuck Norris Jokes</b>!

To get a joke type <b>/joke</b> and a number,
It can be a number between 1 and 100.

If you want a random joke you can click/type <b>/random</b>

To get info about Chuck Norris you can click/type <b> /info </b>

If you got stuck click/type <b> /help </b>
    `;

  ctx.replyWithHTML(help);
}

module.exports = {
  getHelp,
};
