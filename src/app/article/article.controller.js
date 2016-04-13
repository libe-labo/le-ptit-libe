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
        $scope.$parent.getChapo = this.getChapo.bind(this);
    }

    getChapo () {
        return this.titles.chapo;
    }

    getCurrentArticle () {
        if (this.$stateParams.article !== String(parseInt(this.$stateParams.article))) {
            return '4-region';
        }
        return this.$stateParams.article;
    }

    getTitle (article) {
        if (article != null) {
            return this.titles.articles[article];
        }
        return this.titles.title.replace(' ', '<br>');
    }

    getArticleTitle () {
        if (this.$stateParams.article !== String(parseInt(this.$stateParams.article))) {
            return this.getTitle(4);
        }
        return this.getTitle(this.$stateParams.article);
    }

    getVignetteImage () {
        if (this.$stateParams.article !== String(parseInt(this.$stateParams.article))) {
            return 'assets/images/menu/menu-4.svg';
        }
        return `assets/images/menu/menu-${this.$stateParams.article}.svg`;
    }
}

export default ArticleController;

import { TitlesResolve } from '../components/page/page.controller';
export function ArticleControllerResolve() {
    return {
        titles : TitlesResolve
    };
}
