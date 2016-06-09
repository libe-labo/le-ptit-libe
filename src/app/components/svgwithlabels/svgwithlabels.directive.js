'use strict';

export function SvgWithLabelsDirective() {
    'ngInject';

    let directive = {
        restrict: 'E',
        templateUrl: 'app/components/svgwithlabels/svgwithlabels.html',
        scope: {
            data: '='
        },
        link: linkFunc,
        controller: SvgWithLabels,
        controllerAs: 'svgwithlabels',
        bindToController: true
    };

    function linkFunc() {
    }

    return directive;
}

class SvgWithLabels {
    constructor ($scope, $element) {
        'ngInject';

        let svg = $element.get()[0].querySelector('object');

        this.$scope = $scope;

        $scope.svgdata = this.data;
        $scope.label = '';

        $element.get()[0].querySelector('object').addEventListener('load', () => {
            svg = svg.contentDocument;
            let items = _.filter([].slice.call(svg.querySelectorAll('*[id]')), (o) => {
                return o.tagName !== 'svg';
            });

            _.each(items, (o) => {
                let label = (
                    o.getAttribute('id').indexOf('__x2F__') >= 0
                        ? o.getAttribute('id').split('__x2F__')[1]
                        : o.getAttribute('id')
                ).replace(/_/g, ' ').trim().replace(/\s*\d+$/, '');
                o.style.cursor = 'pointer';
                o.addEventListener('click', () => {
                    _.forEach(items, (o) => { o.classList.remove('active'); });
                    o.classList.add('active');
                    this.$scope.$apply(() => {
                        this.setLabel(label);
                    });
                });
            });
        });
    }

    setLabel (newLabel) {
        this.$scope.label = newLabel;
    }
}
