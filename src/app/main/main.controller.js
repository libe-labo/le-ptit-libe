'use strict';

class MainController {
    constructor ($scope, titles) {
        'ngInject';

        this.$scope = $scope;
        this.titles = titles;

        $scope.getTitle = this.getTitle.bind(this);
        $scope.$parent.getChapo = this.getChapo.bind(this);
    }

    getChapo () {
        return this.titles.chapo;
    }

    getTitle (article) {
        if (article != null) {
            return this.titles.articles[article];
        }

        if (this.$scope.getCurrentRelease() === '3') {
            return this.titles.title;
        }
        return this.titles.title.replace(' ', '<br>');
    }
}

export default MainController;

import { TitlesResolve } from '../components/page/page.controller';
export function MainControllerResolve() {
    return {
        titles : TitlesResolve
    };
}
