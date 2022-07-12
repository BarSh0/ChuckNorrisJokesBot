function parseCommandParams(commandName, fullMessage){
    const text = fullMessage.replace(commandName,"").trim();

    return text.split(" ").map(p => p.trim());
}

module.exports = {
    parseCommandParams
}