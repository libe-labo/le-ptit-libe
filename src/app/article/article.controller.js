'use strict';

class ArticleController {
    constructor ($scope, $stateParams, titles) {
        'ngInject';

        this.$scope = $scope;
        this.$stateParams = $stateParams;
        this.titles = titles;

        $scope.getCurrentArticle = this.getCurrentArticle.bind(this);
        $scope.getTitle = this.getTitle.bind(this);
        $scope.getArticleTitle = this.getArticleTitle.bind(this);
        $scope.getVignetteImage = this.getVignetteImage.bind(this);

        // Remove in prod
        // window.setTimeout(function() {
        //     window.ContentTools.StylePalette.add([
        //         new window.ContentTools.Style('Coloré', 'color-fg', ['p']),
        //         new window.ContentTools.Style('Majuscules', 'uppercase', ['p']),
        //         new window.ContentTools.Style('Libé Sans Rond', 'libesansrond', ['p']),
        //     ]);
        //
        //     var editor;
        //     editor = window.ContentTools.EditorApp.get();
        //     editor.init('*[data-editable]', 'data-name');
        //
        //     editor.bind('save', function(regions) {
        //         this.busy(true);
        //
        //         $http({
        //             url : `http://${window.location.hostname}:3003/save`,
        //             method : 'POST',
        //             headers : { 'Content-Type': undefined },
        //             data : {
        //                 release : $stateParams.release,
        //                 article : $stateParams.article,
        //                 content : regions.content
        //             }
        //         }).then(function(response) {
        //             this.busy(false);
        //
        //             if (response.status === 200) {
        //                 new window.ContentTools.FlashUI('ok');
        //             } else {
        //                 new window.ContentTools.FlashUI('no');
        //             }
        //         });
        //     });
        // }, 1000);
    }

    getCurrentArticle () {
        return this.$stateParams.article;
    }

    getTitle (article) {
        if (article != null) {
            return this.titles.articles[article];
        }
        return this.titles.title.replace(' ', '<br>');
    }

    getArticleTitle () {
        return this.getTitle(this.$stateParams.article);
    }

    getVignetteImage () {
        return `assets/images/menu/menu-${this.$stateParams.release}-` +
               `${this.$stateParams.article}.svg`;
    }
}

export default ArticleController;

import { TitlesResolve } from '../components/page/page.controller';
export function ArticleControllerResolve() {
    return {
        titles : TitlesResolve
    };
}
