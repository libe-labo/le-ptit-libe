'use strict';

export function PopOverDirective() {
    'ngInject';

    let directive = {
        restrict: 'E',
        templateUrl: 'app/components/pop-over/pop-over.partial.html',
        scope: { },

        link: linkFunc,

        controller: PopOver,
        controllerAs: 'popov',
        bindToController: true
    };

    function linkFunc() {
    }

    return directive;
}

class PopOver {
    constructor ($scope, $element) {
        'ngInject';

        this.$scope = $scope;
        this.$element = $element;

        $scope.title = '';
        $scope.content = '';

        $scope.$on('popovopen', (function(ev, data) {
            this.open(data);
        }).bind(this));

        $scope.close = this.close.bind(this);
        $scope.getStyle = this.getStyle.bind(this);

        this.isOpen = false;
    }

    open (data) {
        this.$scope.title = data.title;
        this.$scope.content = data.content;
        this.isOpen = true;
        $('body').animate({
            scrollTop: this.$element.offset().top - 65
        }, 'slow');
    }

    close () {
        this.isOpen = false;
    }

    getStyle () {
        return {
            'display': this.isOpen ? '' : 'none',
            'border-color': this.$scope.$parent.$parent.getColor(),
            'background-color': this.$scope.$parent.$parent.getCartelColor()
        };
    }
}
