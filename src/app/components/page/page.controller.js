'use strict';

class PageController {
    constructor ($scope, $stateParams, $state) {
        'ngInject';

        this.$stateParams = $stateParams;
        this.$state = $state;

        $scope.getBodyStyle = this.getBodyStyle.bind(this);
        $scope.getCartelStyle = this.getCartelStyle.bind(this);
        $scope.shareOnFacebook = this.shareOnFacebook.bind(this);
        $scope.getDownloadHref = this.getDownloadHref.bind(this);

        this.colors = [
            '#c7aace', '#71519d', '#f9f7fb'
        ];
    }

    getBodyStyle () {
        var bgImg = `linear-gradient(${this.colors[0]}, ${this.colors[1]})`;

        if (!this.$state.is('newsletter')) {
            bgImg = `url(assets/images/background.svg),` + bgImg;
        }

        return {
            'background-color' : this.colors[1],
            'background-image' : bgImg,
            'background-position' : `center bottom ${$('.footer').outerHeight() * 1.5}px`
        };
    }

    getCartelStyle () {
        return {
            'background-color' : this.colors[2]
        };
    }

    getDownloadHref () {
        return `assets/pdf/le-ptit-libe.pdf`;
    }

    shareOnFacebook () {
        var url = encodeURIComponent(window.location.origin + window.location.pathname),
            link = 'http://www.facebook.com/sharer/sharer.php?u=' + url;
        window.open(link, '', 'width=575,height=400,menubar=no,toolbar=no');
    }
}

export default PageController;
