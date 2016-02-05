'use strict';

function config ($logProvider, $analyticsProvider) {
    'ngInject';
    // Enable log
    $logProvider.debugEnabled(false);
    $analyticsProvider.virtualPageviews(false);
}

export default config;
