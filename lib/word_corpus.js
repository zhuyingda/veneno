"use strict";

function carry(l) {
    let asc = l.charCodeAt(0);
    if (asc === 122) {
        return false;
    }
    return String.fromCharCode(asc + 1);
}

function setStringAt(str, i, l) {
    if (i === 0) {
        return l + str.slice(1, str.length)
    } else if (i === str.length - 1) {
        return str.slice(0, str.length - 1) + l;
    } else {
        return str.slice(0, i) + l + str.slice(i + 1, str.length);
    }
}

function isZZZ(word) {
    for (let i of word) {
        if (i != 'z') {
            return false;
        }
    }
    return true;
}

function nextWord(word) {
    let tempStr = word;
    if (isZZZ(tempStr)) {
        let newWord = '';
        for (let i of word) {
            newWord += 'a';
        }
        newWord += 'a';
        return newWord;
    }
    if (word[word.length - 1] != 'z') {
        return setStringAt(word, word.length - 1, carry(tempStr[word.length - 1]));
    }
    let index = tempStr.length - 1;
    while (index >= 0) {
        if (tempStr.charCodeAt(index) < 122) {
            tempStr = setStringAt(tempStr, index, carry(tempStr[index]));
            let i = 1;
            while (index + i < word.length) {
                tempStr = setStringAt(tempStr, index + i, 'a');
                i++;
            }
            break;
        } else {
            index--;
        }
    }
    return tempStr;
}

module.exports = {
    nextWord: nextWord
<<<<<<< HEAD
}
=======
}
>>>>>>> 79e45eab160ff84fdd1e7c4ce345f2a57cb61917
