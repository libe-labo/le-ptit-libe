'use strict';

class HeaderController {
    constructor ($scope) {
        'ngInject';

        this.baseIntroInnerHeight = 'auto';
        window.setTimeout(function() {
            $scope.$apply(function() {
                this.baseIntroInnerHeight = $('.header__intro__inner').outerHeight();
            }.bind(this));
        }.bind(this), 500);

        this.folded = false;

        $scope.getIntroClass = this.getIntroClass.bind(this);
        $scope.getIntroInnerClass = this.getIntroInnerClass.bind(this);
        $scope.getIntroInnerStyle = this.getIntroInnerStyle.bind(this);

        $(window).on('scroll', () => {
            $scope.$apply(() => {
                var passed = $(window).scrollTop() + ($(window).innerHeight() * 0.90) >
                             $('.header__intro').offset().top + $('.header__intro').outerHeight();
                if (!this.folded && passed) {
                    this.folded = true;
                    $(window).scrollTop(5);
                } else if (this.folded && $(window).scrollTop() <= 0) {
                    this.folded = false;
                }
            });
        });
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

    getIntroInnerStyle () {
        return {
            height : this.folded ? 0 : this.baseIntroInnerHeight
        };
    }
}

export default HeaderController;
