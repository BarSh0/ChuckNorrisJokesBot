const { Telegraf, Markup } = require("telegraf");

const { parseCommandParams } = require("../utils/parseCommandParams");
const { ChuckNorrisInfoFetcher } = require("../fetchers/ChuckNorrisInfoFetcher");
const { getChuckNorrisQuote } = require("../commands/getChuckNorrisQuote");
const { messages } = require("../utils/messages");
const { getHelp } = require("../commands/getHelp");

function initTelegramBot() {
  const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN, {
    webhookReply: true,
  });

  bot.start(async (ctx) => {
    await ctx.reply(
      getHelp(ctx).catch((e) => ctx.reply(e.message)),
      Markup.keyboard([["/random"], ["/info", "/help"]])
    );

    bot.help((ctx) => {
      getHelp(ctx).catch((e) => ctx.reply(e.message));
    });

    bot.command("joke", async (ctx) => {
      const loader = await ctx.reply(messages.botLoading);

      const params = parseCommandParams("/joke", ctx.message.text);

      try {
        const joke = await getChuckNorrisQuote(params);

        await ctx.deleteMessage(loader.message_id);

        await ctx.reply(joke);
      } catch (e) {
        await ctx.deleteMessage(loader.message_id);

        await ctx.reply(e.message);
      }
    });

    bot.command("random", async (ctx) => {
      const loader = await ctx.reply(messages.botLoading);

      try {
        const joke = await getChuckNorrisQuote([]);

        await ctx.deleteMessage(loader.message_id);

        await ctx.reply(joke);
      } catch (e) {
        await ctx.deleteMessage(loader.message_id);

        await ctx.reply(e.message);
      }
    });

    bot.command("info", async (ctx) => {
      const loader = await ctx.reply(messages.botLoading);

      const infoFetch = new ChuckNorrisInfoFetcher();

      try {
        const info = await infoFetch.getQuoteByIndex();

        await ctx.deleteMessage(loader.message_id);

        await ctx.reply(info);
      } catch (e) {
        await ctx.deleteMessage(loader.message_id);

        await ctx.repl(e.message);
      }
    });
  });

  return bot;
}

module.exports = {
  initTelegramBot,
};
