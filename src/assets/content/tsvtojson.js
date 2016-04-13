/* globals require */

'use strict';

var d3 = require('d3');
var fs = require('fs');

fs.readFile('regions.tsv', { encoding : 'utf-8' }, function(err, raw) {
    var data = d3.tsv.parse(raw, function(d) {
        d.famous = d['Ils y sont nés'].split('\n\n');

        for ( var i = 0; i < d.famous.length; ++i) {
            d.famous[i] = d.famous[i].trim();
            d.famous[i] = d.famous[i].trim('\n');
            d.famous[i] ={
                pic : d.famous[i].split('\n')[0],
                text : d.famous[i].replace(/\n/g, '<br>')
            };
        }

        return {
            name : d[''],
            intro : d['Petite intro'],

            capital : d['La ville chef-lieu de région (future capitale)'].replace(/\n/g, '<br>'),

            famous : d.famous,

            description : d['Qu’est-ce qu’elle a de spécial, ma région? '].split('\n'),

            food : d['Et pour les gourmands? '].replace(/\n/g, '<br>'),

            language : d['Quel dictionnaire? '].replace(/\n/g, '<br>'),

            id : d.ID
        };
    });

    fs.writeFile('regions.json', JSON.stringify(data), { encoding : 'utf-8' });
});
