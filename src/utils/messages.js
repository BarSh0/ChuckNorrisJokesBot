//Here is where we get the messages to output
messages = {
    indexError: (index) => `Index ${index} out of bounds`,
    inputNotNumber: (input) =>`"${input}" is not a number`,
    negativeOrZeroNumber:`Number must be 1 or greater`,
    paramsError:"Invalid number of parameters",
    errorMessage: (e) =>`Oops!: ${e}`,
    randomQuote:"Here's a random quote: ",
    botLoading:"Loading..."

};

module.exports = {
    messages
}