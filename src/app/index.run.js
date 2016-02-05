'use strict';

function runBlock ($rootScope, $window, $location) {
    'ngInject';

    $window.ga('create', 'UA-41822557-1', 'auto');
    $rootScope.$on('$stateChangeSuccess', function() {
        $window.ga('send', 'pageview', location.pathname + '#' + $location.path());
    });
}

export default runBlock;
