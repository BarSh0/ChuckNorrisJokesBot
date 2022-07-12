const {getChuckNorrisQuote} = require("../src/commands/getChuckNorrisQuote");
const { TELEGRAM_COMMAND_CHUCK_GET_QUOTE } = require("../src/telegram/commands");
const { messages } = require("../src/utils/messages");


describe(`Telegram command ${TELEGRAM_COMMAND_CHUCK_GET_QUOTE}: param validity > Bad Params` , () => {

    test('Invalid Param: string not acccepted', async () => {
        const mock = ["prince"];

        let msg;
        try{
            msg = await getChuckNorrisQuote(mock);
        } catch (e){
            msg = e.message;
        }

        expect(msg).toBe(messages.inputNotNumber(mock[0]));
    });

    test('Invalid param: negative numbers not accepted', async () => {
        const mock = ["-1"];

        let msg;
        try{
            msg = await getChuckNorrisQuote(mock);
        } catch (e){
            msg = e.message;
        }

        expect(msg).toBe(messages.negativeOrZeroNumber);
    });

    test('Invalid param: zero is not accepted', async () => {
        const mock = ["0"];

        let msg;
        try{
            msg = await getChuckNorrisQuote(mock);
        } catch (e){
            msg = e.message;
        }

        expect(msg).toBe(messages.negativeOrZeroNumber);
    });

    test('Invalid param: out of bounds numbers are not accepted', async () => {
        const mock = ["368"];

        let msg;
        try{
            msg = await getChuckNorrisQuote(mock);
        } catch (e){
            msg = e.message;
        }

        expect(msg).toBe(messages.indexError(mock));
    });

    test('Invalid param: multiple numbers are not accepted', async () => {
        const mock = ["34","56"];

        let msg;
        try{
            msg = await getChuckNorrisQuote(mock);
        } catch (e){
            msg = e.message;
        }

        expect(msg).toBe(messages.paramsError);
    });

});

describe(`Telegram command ${TELEGRAM_COMMAND_CHUCK_GET_QUOTE}: param validity > Valid Params`, () => {

    test('Valid param: return quote by that index', async () => {
        const mock = ["78"];

        const msg = await getChuckNorrisQuote(mock);

        expect(msg).toBeTruthy();
    });

    test('Valid param: return random quote', async () => {
        const mock = [""];

        const msg = await getChuckNorrisQuote(mock);

        expect(msg).toBeTruthy();
    });
});