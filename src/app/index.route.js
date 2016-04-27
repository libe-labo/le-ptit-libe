'use strict';

import { addNbSp } from './components/utils/utils';

let resolve = function($q, $http) {
    let deferred = $q.defer();

    $http({
        method: 'GET',
        url: `assets/titles.json`
    }).then(function(response) {
        if (response.status === 200) {
            if (typeof(response.data) === typeof('')) { response.data = JSON.parse(response.data); }
            response.data.title = addNbSp(response.data.title);
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
            url: '/',
            templateUrl: 'app/main/main.html',
            controller: 'MainController',
            controllerAs: 'main',
            resolve: { titles : resolve }
        })
        .state('resources', {
            url: '/resources/',
            templateUrl: 'app/resources/resources.html',
            controller: 'ResourcesController',
            controllerAs: 'resources',
            resolve: { titles : resolve }
        })
        .state('newsletter', {
            url: '/newsletter/',
            templateUrl: 'app/newsletter/newsletter.html',
            controller: 'NewsletterController',
            controllerAs: 'newsletter',
            resolve: { titles : resolve }
        })
        .state('article', {
            url: '/:article/',
            templateUrl: 'app/article/article.html',
            controller: 'ArticleController',
            controllerAs: 'article',
            resolve: { titles : resolve }
        });

    $urlRouterProvider.otherwise('/');
}

export default routerConfig;
