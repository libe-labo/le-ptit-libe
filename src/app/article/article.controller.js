'use strict';

import MainController from '../main/main.controller';

class ArticleController extends MainController {
    constructor ($scope, titles, $stateParams) {
        'ngInject';

        super($scope, titles, $stateParams);

        $scope.getCurrentArticle = this.getCurrentArticle.bind(this);
        $scope.getArticleTitle = this.getArticleTitle.bind(this);
        $scope.getVignetteImage = this.getVignetteImage.bind(this);
    }

    getCurrentArticle () {
        return this.$stateParams.article;
    }

    getArticleTitle () {
        return this.getTitle(this.$stateParams.article);
    }

    getVignetteImage () {
        return `assets/images/menu/menu-${this.$stateParams.article}.svg`;
    }
}

export default ArticleController;
