'use strict';

export function addNbSp(str) {
    if (str == null) { return str; }

    let chars = ['?', '!', ':', ';'];
    _.each(chars, function(char) {
        str = str.replace(new RegExp(`\\s+\\${char}`), `&nbsp;${char}`);
    });
    return str;
}

export function allIndexesOf(str, search) {
    let indexes = [];
    for (let i = 0; i < str.length;) {
        i = str.indexOf(search, i);
        if (i < 0) { break; }
        indexes.push(i++);
    }
    return indexes;
}

export function replaceAt(str, index, replacement) {
    return index != null
        ? `${str.slice(0, index)}${replacement}${str.slice(index + 1, str.length)}`
        : str;
}

export function getCenterValue(array) {
    return array[parseInt(array.length / 2)];
}
