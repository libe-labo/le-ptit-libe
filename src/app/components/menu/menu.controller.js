'use strict';

class MenuController {
    constructor ($scope, $stateParams, $rootScope, $anchorScroll) {
        'ngInject';

        this.$stateParams = $stateParams;

        $scope.getVignetteRepetition = this.getVignetteRepetition.bind(this);
        $scope.getVignetteArticleId = this.getVignetteArticleId.bind(this);
        $scope.getVignetteImage = this.getVignetteImage.bind(this);

        $rootScope.$on('$viewContentLoaded', function() {
            $anchorScroll('content');
        });
    }

    getVignetteRepetition () {
        return _.range(0, 7);
    }

    getVignetteArticleId (row, col) {
        if (row <= 0) {
            return 0;
        }
        return 1 + ((row - 1) * 3) + col;
    }

    getVignetteImage (idx) {
        return `assets/images/menu/menu-${idx}.svg`;
    }
}

export default MenuController;
