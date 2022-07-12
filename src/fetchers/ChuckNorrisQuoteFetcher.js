const axios = require("axios");
const {JSDOM} = require("jsdom");

class ChuckNorrisQuoteFetcher{
    #url = "https://parade.com/968666/parade/chuck-norris-jokes/";
    #listItemsSelector = "ol>li";

    //get quote by index from the website
    async getQuoteByIndex (index) {
        const html = await this.fetchPage();
        const quotes = this.#extractQuotes(html);
        const quote = quotes[index -1];

        return quote?`${index}. ${quotes[index -1]}`:quote;
    }

    //get quote by generating a random index
    async getRandomQuote () {
        const html = await this.fetchPage();
        const quotes = this.#extractQuotes(html);
        const index = Math.floor(Math.random() * quotes.length) + 1;
        
        return `${index}. ${quotes[index -1]}`;
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

        const quotes = [...document.querySelectorAll(this.#listItemsSelector)].map(e => e.textContent);

        return quotes;

    }
}

//export  class
module.exports = {
    ChuckNorrisQuoteFetcher
}