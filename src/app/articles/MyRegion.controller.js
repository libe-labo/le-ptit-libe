'use strict';

class MyRegion {
    constructor ($scope, $stateParams, $http) {
        'ngInject';

        this.$stateParams = $stateParams;

        $http.get('assets/content/regions.json').then(function(data) {
            for (var i = 0; i < data.data.length; ++i) {
                if ('4-' + data.data[i].id === $stateParams.article) {
                    $scope.data = data.data[i];

                    var ids = ['#normandie', '#bretagne', '#pays_de_la_loire', '#aquitaine',
                               '#languedoc', '#alsace', '#auvergne', '#bourgogne',
                               '#centre_val_de_loire', '#corse', '#ile_de_france',
                               '#nord_pas_de_calais', '#provence', '#guadeloupe', '#guyane',
                               '#martinique', '#réunion', '#mayotte'];

                    var $svg = $($('#map')[0].getSVGDocument());

                    $svg.find('.st3').css('display', 'none');

                    $svg.find(ids.join(', ')).css('fill', '#f4a300');
                    $svg.find('#' + $stateParams.article.replace(/^4-/, '')).css('fill', '#008a90')
                        .children().css('fill', '#008a90');

                    break;
                }
            }
        });
    }
}

export default MyRegion;
