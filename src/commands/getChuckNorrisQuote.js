const { ChuckNorrisQuoteFetcher } = require("../fetchers/ChuckNorrisQuoteFetcher");
const { checkParamValidity } = require("../utils/checkParam");
const { messages } = require("../utils/messages");

async function getChuckNorrisQuote(params){

    //multiple parameters check
    if (params.length > 1){
        throw new Error(messages.paramsError);
    }

    const param = params[0];

    const fetcher = new ChuckNorrisQuoteFetcher();

    //no parameter given - generate random quote
    if (!param){
        const quote = await fetcher.getRandomQuote();
        return  messages.randomQuote + quote;
    } 

    const isParamValid = checkParamValidity(param);

    //parameter is invalid
    if (!isParamValid.validity){
        throw new Error(isParamValid.message);
    }

    const index = isParamValid.message;

    const quote = await fetcher.getQuoteByIndex(index);

    console.log(`quote: ${quote}`)
    //returned empty quote - the index was too high
    if (!quote){
        throw new Error(messages.indexError(index));  
    }
    return quote;
}


module.exports = {
    getChuckNorrisQuote: getChuckNorrisQuote
}