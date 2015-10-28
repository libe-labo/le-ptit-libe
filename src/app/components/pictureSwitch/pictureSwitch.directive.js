'use strict';

export function PictureSwitchDirective() {
    'ngInject';

    let directive = {
        restrict: 'E',
        templateUrl: 'app/components/pictureSwitch/pictureSwitch.html',
        scope: {
            first: '=',
            second: '='
        },
        link: linkFunc,
        controller: PictureSwitch,
        controllerAs: 'ps',
        bindToController: true
    };

    function linkFunc() {
    }

    return directive;
}

class PictureSwitch {
    constructor ($scope) {
        'ngInject';

        this.$scope = $scope;

        $scope.first = this.first;
        $scope.second = this.second;
        $scope.name = `rb${String(parseInt(Math.random() * 100 / 100))}`;
        $scope.selector = 0;

        $scope.getSecondPictureStyle = this.getSecondPictureStyle.bind(this);
    }

    getSecondPictureStyle () {
        return {
            opacity : this.$scope.selector
        };
    }
}
