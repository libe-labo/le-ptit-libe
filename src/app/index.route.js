'use strict';

import { addNbSp } from './components/utils/utils';

let resolve = function($q, $http, $stateParams) {
    let deferred = $q.defer();

    $http({
        method: 'GET',
        url: `assets/content/titles-${$stateParams.release}.json`
    }).then(function(response) {
        if (response.status === 200) {
            if (typeof(response.data) === typeof('')) { response.data = JSON.parse(response.data); }
            response.data.title = addNbSp(response.data.title);
            response.data.chapo = _.map(response.data.chapo, addNbSp);
            response.data.articles = _.map(response.data.articles, addNbSp);
            deferred.resolve(response.data);
        } else {
            deferred.reject(response.status);
        }
    });

    return deferred.promise;
};

function routerConfig ($stateProvider, $urlRouterProvider) {
    'ngInject';

    $stateProvider
        .state('menu', {
            url: '/:release/',
            templateUrl: 'app/main/main.html',
            controller: 'MainController',
            controllerAs: 'main',
            resolve: { titles : resolve }
        })
        .state('resources', {
            url: '/:release/resources/',
            templateUrl: 'app/resources/resources.html',
            controller: 'ResourcesController',
            controllerAs: 'resources',
            resolve: { titles : resolve }
        })
        .state('newsletter', {
            url: '/:release/newsletter/',
            templateUrl: 'app/newsletter/newsletter.html',
            controller: 'NewsletterController',
            controllerAs: 'newsletter',
            resolve: { titles : resolve }
        })
        .state('article', {
            url: '/:release/:article/',
            templateUrl: 'app/article/article.html',
            controller: 'ArticleController',
            controllerAs: 'article',
            resolve: { titles : resolve }
        });

    $urlRouterProvider.otherwise('/3/');
}

export default routerConfig;
