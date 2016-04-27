'use strict';

export function AccordionnDirective($compile) {
    'ngInject';

    let directive = {
        restrict: 'E',

        scope: { },

        link: linkFunc,

        controller: Accordionn,
        controllerAs: 'acc',
        bindToController: true
    };

    function linkFunc($scope, $element) {
        $scope.signs = [];

        $element.children().each(function(idx) {
            $scope.signs.push('+');

            var child = $(this);

            var sign = angular.element('<img>');
            sign.attr('ng-src', '{{ getSign(' + idx + ') }}');
            $compile(sign)($scope);
            child.children('.libesansrond').append(sign);
            child.children('.libesansrond').attr('ng-click', 'toggle(' + idx + ')');
            child.children('.libesansrond').css('cursor', 'pointer');
            $compile(child.children('.libesansrond'))($scope);

            child.children(':not(.libesansrond)').each(function() {
                $(this).attr('ng-style', 'getVisibility(' + idx + ')');
                $compile(this)($scope);
            });
        });
    }

    return directive;
}

class Accordionn {
    constructor ($scope) {
        'ngInject';

        this.$scope = $scope;

        $scope.getVisibility = this.getVisibility.bind(this);
        $scope.getSign = this.getSign.bind(this);
        $scope.toggle = this.toggle.bind(this);
    }

    getVisibility (idx) {
        return {
            display: this.$scope.signs[idx] === '-' ? 'block' : 'none'
        };
    }

    getSign (idx) {
        if (this.$scope.signs[idx] === '-') {
            return 'assets/images/components/moins.svg';
        } else {
            return 'assets/images/components/plus.svg';
        }
    }

    toggle (idx) {
        this.$scope.signs[idx] = this.$scope.signs[idx] === '-' ? '+' : '-';
    }
}
