'use strict';

class ResourcesController {
    constructor ($scope, $http) {
        'ngInject';

        $http.get(`assets/content/resources-${$scope.getCurrentRelease()}.json`).then(response => {
            if (response.status === 200) {
                $scope.attribution = response.data.attribution;
                $scope.resources = response.data.resources;
            }
        });
    }
}

export default ResourcesController;
