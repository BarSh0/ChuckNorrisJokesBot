const axios = require("axios");
const {JSDOM} = require("jsdom");

class ChuckNorrisInfoFetcher{
    #url = "https://simple.wikipedia.org/wiki/Chuck_Norris";
    #listItemsSelector = "p";

    //get quote by index from the website
    async getQuoteByIndex () {
        const html = await this.fetchPage();
        const info = this.#extractQuotes(html);

        return info;
    }

    //fetch the page html src 
    async fetchPage (){
        const response = await axios.get(this.#url);

        return response.data;
    }

    //get list of quotes
    #extractQuotes(html){

        //assign html page to jsdom to initialize virtual dom
        const {document} = new JSDOM(html).window;

        const quotes = [...document.querySelectorAll(this.#listItemsSelector)].map(e => e.textContent.trimEnd());

        return quotes[0];

    }
}

//export  class
module.exports = {
    ChuckNorrisInfoFetcher
}