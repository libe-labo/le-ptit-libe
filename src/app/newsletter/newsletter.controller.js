'use strict';

class NewsletterController {
    constructor ($scope, $stateParams, titles) {
        'ngInject';

        this.$stateParams = $stateParams;
        this.titles = titles;

        $scope.getTitle = this.getTitle.bind(this);
        $scope.getVignetteImage = this.getVignetteImage.bind(this);
    }

    getTitle (article) {
        if (article != null) {
            return this.titles.articles[article];
        }
        return this.titles.title.replace(' ', '<br>');
    }

    getVignetteImage () {
        return `assets/images/menu/menu-${this.$stateParams.article}.svg`;
    }
}

export default NewsletterController;
