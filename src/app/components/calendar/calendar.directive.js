'use strict';

export function CalendarDirective() {
    'ngInject';

    let directive = {
        restrict: 'E',
        templateUrl: 'app/components/calendar/calendar.html',
        scope: { },
        link: linkFunc,
        controller: Calendar,
        controllerAs: 'cal',
        bindToController: true
    };

    function linkFunc() {
    }

    return directive;
}

class Calendar {
    constructor($scope) {
        'ngInject';

        this.$scope = $scope;

        $scope.items = [];
        const names = ['janvier', 'février', 'mars', 'avril', 'mai',
                       'juin', 'juillet', 'août', 'septembre',
                       'octobre', 'novembre', 'décembre', 'mois inter.'];
        for (let i = 0; i < names.length; ++i) {
            $scope.items.push({
                idx: i,
                name: names[i]
            });
        }

        $scope.getStyleFor = this.getStyleFor.bind(this);
        $scope.select = this.select.bind(this);
        $scope.getSwitchSrc = this.getSwitchSrc.bind(this);

        this.positions = [
            [
                [1, 6], [1, 7], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6],
                [0, 7], [1, 2], [1, 3], [1, 4], [1, 5], [1, 3]
            ],
            [
                [1, 6], [1, 7], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6],
                [0, 7], [1, 0], [1, 1], [1, 2], [1, 5], [1, 3]
            ],
            [
                [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7], [1, 2],
                [1, 3], [1, 4], [1, 5], [1, 6], [1, 7], [1, 3]
            ]
        ];

        this.display = [
            [
                true, true, true, true, true, true, true,
                true, true, true, true, true, false
            ],
            [
                true, true, true, true, true, true, true,
                true, true, true, true, true, true
            ],
            [
                true, true, true, true, true, true, true,
                true, true, true, true, true, false
            ]
        ];

        this.stage = 0;
        this.select(this.stage);
    }

    getStyleFor (item) {
        const transform = 'translate(' +
            String(item.translate[0]) + '%, ' +
            String(item.translate[1]) + '%' +
        ')';
        return {
            '-webkit-transform': transform,
            'transform': transform,
            'opacity': item.show ? 1 : 0,
            'background-image': 'url(assets/images/c' +
                String(this.stage) + '/' + String(item.idx) + '.svg)'
        };
    }

    select (stageIdx) {
        this.stage = stageIdx;
        this.$scope.items.forEach((item, idx) => {
            item.translate = [
                this.positions[stageIdx][idx][0] * 120,
                this.positions[stageIdx][idx][1] * (idx === 12 ? 50 : 100),
            ];
            item.show = this.display[stageIdx][idx];
        });
    }

    getSwitchSrc (idx) {

        return 'assets/images/pictureswitch' + (idx === this.stage ? '-actif' : '') +
               '.svg';
    }
}
