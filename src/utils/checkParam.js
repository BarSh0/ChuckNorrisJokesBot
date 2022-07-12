const { messages } = require("./messages");

function checkParamValidity (input){

    const numInput = Number(input);

    //not a number
    if(isNaN(numInput)){
        return {
            validity:false,
            message:messages.inputNotNumber(input)
        };
    }

    // 0 or less
    if(numInput < 1){
        return {
            validity:false,
            message:messages.negativeOrZeroNumber
        };
    }

    return {
        validity:true,
        message: Number(input)
    }
}

module.exports = {
    checkParamValidity
}