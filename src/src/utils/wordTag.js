// Auxiliar to break a string word: tranlation 1, translation 2, ...
// into the wordCard object
const parseStrToWordTag = (string) => {
    string = string.trim();
    const wordAndTrans = string.split(':', 2);

    console.log(wordAndTrans);

    const wordTag = {
        word: wordAndTrans[0],
        translations: wordAndTrans[1].split(', ')
    };

    return wordTag;
};

// Auxiliar to transform a list of strings in a word tag
const parseListToWordTag = (list) => {
    const wordTag = {
        word: list[0],
        translations: list.slice(1, list.length)
    }

    return wordTag;
}

export {
    parseListToWordTag,
    parseStrToWordTag
}