'use strict';

class MenuController {
    constructor ($scope, $stateParams, $rootScope, $anchorScroll) {
        'ngInject';

        let vLoaded = 0;
        $scope.$on('vLoaded', () => {
            ++vLoaded;
            if (vLoaded >= 7) {
                $(window).trigger('resize');
            }
        });

        this.$stateParams = $stateParams;

        $scope.getVignetteRepetition = this.getVignetteRepetition.bind(this);
        $scope.getVignetteClass = this.getVignetteClass.bind(this);
        $scope.getVignetteArticleId = this.getVignetteArticleId.bind(this);
        $scope.getVignetteImage = this.getVignetteImage.bind(this);

        $rootScope.$on('$viewContentLoaded', function() {
            $anchorScroll('content');
        });

        $(window).off('resize.menuu__item');
        $(window).on('resize.menuu__item', _.debounce(() => {
            var height = 0,
                vHeight = $('.menuu__item img').outerHeight();
            $('.menuu__item').each(function() {
                $(this).css('height', 'auto');
                height = _.max([height, $(this).innerHeight()]);
            });
            $('.menuu__item').css('height', height);

            if (vHeight <= 50) {
                window.setTimeout(() => {
                    $(window).trigger('resize');
                }, 500);
            }
        }, 200));
        $(window).trigger('resize');
    }

    getVignetteRepetition () {
        return _.range(1, 6);
    }

    getVignetteClass (idx) {
        return {
            'col-md-offset-3' : idx === 1,
            'col-md-offset-4' : idx === 4,
            'centered' : idx === 5,
            'large' : idx === 5
        };
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
