'use strict';

class HeaderController {
    constructor ($scope) {
        'ngInject';

        this.folded = false;

        $scope.getIntroClass = this.getIntroClass.bind(this);
        $scope.getIntroInnerClass = this.getIntroInnerClass.bind(this);

        $(window).on('scroll', _.debounce(() => {
            $scope.$apply(() => {
                var passed = $(window).scrollTop() + ($(window).innerHeight() * 0.90) >
                             $('.header__intro').offset().top + $('.header__intro').outerHeight();
                if (!this.folded && passed) {
                    $('.header__intro__inner')
                        .css('max-height', $('.header__intro__inner').outerHeight());
                    this.folded = true;
                    $('.header__intro__inner').css('max-height', '');
                } else if (this.folded && $(window).scrollTop() <= 0) {
                    this.folded = false;
                }
            });
        }, 100));
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
