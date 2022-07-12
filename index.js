const telegrafAws = require('telegraf-aws');
const { initTelegramBot } = require('./src/telegram/initTelegramBot');
require("dotenv/config");

const bot = initTelegramBot();

bot.launch()

// Create webhook handler
const handler = telegrafAws(bot, {
    timeout: 10000 // Optional parameter, after timeout, empty response will be sent to AWS and function execution will be stopped
});

module.exports = {
    handler
}
