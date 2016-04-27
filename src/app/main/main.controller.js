'use strict';

import { allIndexesOf, replaceAt, getCenterValue } from '../components/utils/utils';

class MainController {
    constructor ($scope, titles, $stateParams) {
        'ngInject';

        this.$scope = $scope;
        this.titles = titles;
        this.$stateParams = $stateParams;

        $scope.getTitle = this.getTitle.bind(this);
    }

    getTitle (article) {
        if (article != null) {
            return this.titles.articles[article];
        }

        return replaceAt(
            this.titles.title,
            getCenterValue(allIndexesOf(this.titles.title, ' ')),
            '<br>'
        );
    }
}

export default MainController;

import { TitlesResolve } from '../components/page/page.controller';
export function MainControllerResolve() {
    return {
        titles : TitlesResolve
    };
}
