# Le P'tit Libé

[Libération](http://www.liberation.fr) lance [Le P’tit Libé](http://www.liberation.fr/apps/ptit-libe), pour expliquer l’actualité aux enfants. A travers des dossiers pédagogiques et ludiques, la rédaction décrypte les grands sujets de société pour les petits citoyens.

# Powered by

* [AngularJS](https://github.com/angular/angular.js)
* [Babel](https://github.com/babel/babel)
* [lodash](https://github.com/lodash/lodash)
* [Gulp](https://github.com/gulpjs/gulp)
* [Bootstrap](https://github.com/twbs/bootstrap)
* [Less.js](https://github.com/less/less.js)
* [Jade](https://github.com/jadejs/jade)
* ...

# Installation / Utilisation (dev)

* `npm install -g gulp-cli`
* `npm install`
* `bower install`
* `gulp serve` (démarre le serveur de développement) || `gulp clean && build` (construit la version de production dans `dist/`)

## Plus de détails

Welcome to the neverending hack 💀  
Chaque numéro est dans sa propre branche. Les modifications générales sont toujours mergées dans le `master`.  

* `/src/app/main/` → Page d'accueil
* `/src/app/article/` → Page de chapitre
* `/src/app/articles/` → Contenu des pages chapitre (.gitignore sur le `master`)
* `/src/app/components/` → Composants utilisés dans les chapitres
* `/src/app/newsletter/` → Page d'inscription à la newsletter, faite un peu dans l'urgence🚨 à l'époque
* `/src/app/index.less` → Fichier de style principal. La définition des couleurs du numéro s'y fait tout en haut  
⚠️ c'est utilisé par `/src/app/components/page/page.controller.js`
* `/assets/titles.json` → Description des titres (.gitignore sur le `master`)
```json
{
    "title": "Titre du numéro",
    "chapters": [
        "Titre du chapitre 1",
        "...",
        "Quiz"
    ]
}
```
* `/assets/quiz.tsv` → Description du quiz (.gitignore sur le `master`)  
En `.tsv` parce que tiré d'un spreadsheet (donc éditable facilement par n'importe qui).

| Titre | Bonne reponse | Reponse 1   | Reponse 2 | Reponse 3 |
| ----- | ------------- | ----------- | --------- | --------- |
| Foo   | 1             | Lorem ipsum | dolor     | sit amet  |

* `/assets/pdf/le-ptit-libe.pdf` → PDF du lien «imprime-moi» (.gitignore sur le `master`)
* `/assets/images/menu/` → Vignettes du menu (.gitignore sur le `master`)  
Les éléments SVG des vignettes ayant un attribut `id` seront coloriés au load de la page.

# License

> The MIT License (MIT)
>
> Copyright (c) Libé Six Plus 2015 - 2016
>
> Permission is hereby granted, free of charge, to any person obtaining a copy
> of this software and associated documentation files (the "Software"), to deal
> in the Software without restriction, including without limitation the rights
> to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
> copies of the Software, and to permit persons to whom the Software is
> furnished to do so, subject to the following conditions:
>
> The above copyright notice and this permission notice shall be included in
> all copies or substantial portions of the Software.
>
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
> IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
> FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
> AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
> LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
> OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
> THE SOFTWARE.
