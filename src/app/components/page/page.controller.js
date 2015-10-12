'use strict';

import { addNbSp } from '../utils/utils';

class PageController {
    constructor ($scope, $stateParams, $state) {
        'ngInject';

        if ([1].indexOf(parseInt($stateParams.release)) < 0) {
            $state.go('menu', { release : 1 });
        }

        this.$stateParams = $stateParams;

        $scope.getCurrentRelease = this.getCurrentRelease.bind(this);
        $scope.getBodyStyle = this.getBodyStyle.bind(this);
        $scope.getBodyClass = this.getBodyClass.bind(this);
        $scope.getCartelStyle = this.getCartelStyle.bind(this);
    }

    getCurrentRelease () {
        return this.$stateParams.release;
    }

    getBodyStyle () {
        return {
            'background-color' : '#e85a24',
            'background-image' : `url(assets/images/background-${this.$stateParams.release}.svg),` +
                                 `linear-gradient(#f2a73b, #e85a24)`,
            'background-position' : `center bottom ${$('.footer').outerHeight() * 1.5}px`
        };
    }

    getBodyClass () {
        return `release-${this.$stateParams.release}`;
    }

    getCartelStyle () {
        return {
            'background-color' : '#faebd9'
        };
    }
}

export function TitlesResolve($q, $http) {
    let deferred = $q.defer();

    $http({
        method: 'GET',
        url: 'assets/content/0/titles.json'
    }).then(function(response) {
        if (response.status === 200) {
            response.data.title = addNbSp(response.data.title);
            response.data.articles = _.map(response.data.articles, addNbSp);
            deferred.resolve(response.data);
        } else {
            deferred.reject(response.status);
        }
    });

    return deferred.promise;
}

export default PageController;
