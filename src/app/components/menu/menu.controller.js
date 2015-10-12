'use strict';

class MenuController {
    constructor ($scope, $stateParams, $rootScope, $anchorScroll) {
        'ngInject';

        this.$stateParams = $stateParams;

        $scope.getReleaseN = this.getReleaseN.bind(this);
        $scope.getVignetteRepetition = this.getVignetteRepetition.bind(this);
        $scope.getVignetteClass = this.getVignetteClass.bind(this);
        $scope.getVignetteArticleId = this.getVignetteArticleId.bind(this);
        $scope.getVignetteImage = this.getVignetteImage.bind(this);

        $rootScope.$on('$viewContentLoaded', function() {
            $anchorScroll('content');
        });
    }

    getReleaseN () {
        return this.$stateParams.release;
    }

    getVignetteRepetition () {
        return _.range(1, 7);
    }

    getVignetteClass (idx) {
        return {
            'col-md-offset-3' : [1, 4].indexOf(idx) >= 0,
            'centered' : idx === 6,
            'large' : idx === 6
        };
    }

    getVignetteArticleId (row, col) {
        if (row <= 0) {
            return 0;
        }
        return 1 + ((row - 1) * 3) + col;
    }

    getVignetteImage (idx) {
        return `assets/images/menu/menu-${this.$stateParams.release}-${idx}.svg`;
    }
}

export default MenuController;
