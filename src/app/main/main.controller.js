'use strict';

class MainController {
    constructor ($scope, titles) {
        'ngInject';

        this.$scope = $scope;
        this.titles = titles;

        $scope.getTitle = this.getTitle.bind(this);
    }

    getTitle (article) {
        if (article != null) {
            return this.titles.articles[article];
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
