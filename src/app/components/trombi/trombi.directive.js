'use strict';

export function TrombiDirective() {
    'ngInject';

    let directive = {
        restrict: 'E',
        templateUrl: 'app/components/trombi/trombi.html',
        scope: {
        },
        link: linkFunc,
        controller: Trombi,
        controllerAs: 'trombi',
        bindToController: true
    };

    function linkFunc() {
    }

    return directive;
}

class Trombi {
    constructor ($scope, $http) {
        'ngInject';

        $http.get('assets/trombi.tsv').then(response => {
            if (response.status === 200) {
                response.data = window.d3_dsv.tsvParse(response.data, (d, idx) => {
                    return {
                        id: idx,
                        line: parseInt(d.Line),

                        pic: d.Picture,

                        position: d.Poste,

                        name: d.Nom,
                        text: d.Texte,
                        age: parseInt(d.Age),
                        club: d.Club,
                        selections: d['Sélections'],
                        credits: d['Crédits'],

                        open: false
                    };
                });
            }

            this.data = _.groupBy(response.data, 'line');
        });

        this.$scope = $scope;

        $scope.getData = this.getData.bind(this);
        $scope.clickedOn = this.clickedOn.bind(this);
    }

    getData (lineId) {
        if (lineId == null || this.data[lineId] == null) {
            return this.data;
        } else {
            return this.data[lineId];
        }
    }

    clickedOn (id) {
        _.each(this.data, (d) => {
            _.each(d, (d) => {
                d.open = d.id === id && !d.open;
            });
        });
    }
}
