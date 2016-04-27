'use strict';

export function PictureSwitchDirective() {
    'ngInject';

    let directive = {
        restrict: 'E',
        templateUrl: 'app/components/pictureSwitch/pictureSwitch.html',
        scope: {
            labels: '=',
            pictures: '='
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

        $scope.selector = 0;

        $scope.getPictures = this.getPictures.bind(this);
        $scope.getPictureStyle = this.getPictureStyle.bind(this);
        $scope.getLabels = this.getLabels.bind(this);
        $scope.getSwitchSrc = this.getSwitchSrc.bind(this);
        $scope.getSwitchClass = this.getSwitchClass.bind(this);
        $scope.select = this.select.bind(this);
    }

    getPictures () {
        return this.pictures;
    }

    getPictureStyle (idx) {
        return {
            opacity: this.$scope.selector === idx ? 1 : 0
        };
    }

    getLabels () {
        return this.labels;
    }

    getSwitchSrc (idx) {
        return 'assets/images/components/pictureswitch' +
               (idx === this.$scope.selector ? '-actif' : '') +
               '.svg';
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
