'use strict';

class ResourcesController {
    constructor ($scope, $http, titles) {
        'ngInject';

        this.titles = titles;

        $http.get(`assets/content/resources.json`).then(response => {
            if (response.status === 200) {
                $scope.attribution = response.data.attribution;
                $scope.resources = response.data.resources;
            }
        });

        $scope.getTitle = this.getTitle.bind(this);
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
}

export default ResourcesController;
