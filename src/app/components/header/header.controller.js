'use strict';

class HeaderController {
    constructor ($scope) {
        'ngInject';

        this.folded = false;

        $scope.getIntroClass = this.getIntroClass.bind(this);
        $scope.getIntroInnerClass = this.getIntroInnerClass.bind(this);
    }

    getIntroClass () {
        return {
            'header__intro--folded' : this.folded
        };
    }

    getIntroInnerClass () {
        return {
            'header__intro--folded__inner' : this.folded
        };
    }
}

export default HeaderController;
