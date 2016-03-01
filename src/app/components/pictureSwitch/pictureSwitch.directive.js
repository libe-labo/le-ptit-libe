'use strict';

export function PictureSwitchDirective() {
    'ngInject';

    let directive = {
        restrict: 'E',
        templateUrl: 'app/components/pictureSwitch/pictureSwitch.html',
        scope: {
            first: '=',
            second: '=',
            firstLabel: '=',
            secondLabel: '='
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
        $scope.firstLabel = this.firstLabel;
        $scope.secondLabel = this.secondLabel;
        $scope.name = `rb${String(parseInt(Math.random() * 100 / 100))}`;
        $scope.selector = 0;

        $scope.getFirstPictureStyle = this.getFirstPictureStyle.bind(this);
        $scope.getSecondPictureStyle = this.getSecondPictureStyle.bind(this);
        $scope.getSwitchSrc = this.getSwitchSrc.bind(this);
        $scope.getSwitchClass = this.getSwitchClass.bind(this);
        $scope.select = this.select.bind(this);
    }

    getFirstPictureStyle () {
        return {
            opacity : this.$scope.selector ? 0 : 1
        };
    }

    getSecondPictureStyle () {
        return {
            opacity : this.$scope.selector
        };
    }

    getSwitchSrc () {
        return 'assets/images/fleche-gauche.svg';
    }

    getSwitchClass (idx) {
        return {
            active: idx === this.$scope.selector
        };
    }

    select (idx) {
        this.$scope.selector = idx;
    }
}
