'use strict';

export function addNbSp(str) {
    let chars = ['?', '!'];
    _.each(chars, function(char) {
        str = str.replace(new RegExp(`\\s+\\${char}`), `&nbsp;${char}`);
    });
    return str;
}
