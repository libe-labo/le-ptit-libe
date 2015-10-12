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
