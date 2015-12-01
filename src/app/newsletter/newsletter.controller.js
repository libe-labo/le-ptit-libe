'use strict';

class NewsletterController {
    constructor ($scope, $stateParams, titles) {
        'ngInject';

        this.$stateParams = $stateParams;
        this.titles = titles;

        $scope.getTitle = this.getTitle.bind(this);
        $scope.getVignetteImage = this.getVignetteImage.bind(this);
        $scope.$parent.getChapo = this.getChapo.bind(this);
    }

    getChapo () {
        return this.titles.chapo;
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
