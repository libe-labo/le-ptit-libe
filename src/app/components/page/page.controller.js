'use strict';

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
        $scope.shareOnFacebook = this.shareOnFacebook.bind(this);
        $scope.getDownloadHref = this.getDownloadHref.bind(this);

        this.colors = [
            [],
            ['#f2a73b', '#e85a24'],
            ['#81bb3f', '#2f6c34']
        ];
    }

    getCurrentRelease () {
        return this.$stateParams.release;
    }

    getBodyStyle () {
        return {
            'background-color' : this.colors[this.$stateParams.release][1],
            'background-image' : `url(assets/images/background-${this.$stateParams.release}.svg),` +
                                 `linear-gradient(${this.colors[this.$stateParams.release][0]},` +
                                                 `${this.colors[this.$stateParams.release][1]})`,
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

    getDownloadHref () {
        return `assets/pdf/le-ptit-libe-${String(this.$stateParams.release)}.pdf`;
    }

    shareOnFacebook () {
        var url = encodeURIComponent(window.location.origin + window.location.pathname +
                                     `/#/${this.$stateParams.release}/`),
            link = 'http://www.facebook.com/sharer/sharer.php?u=' + url;
        window.open(link, '', 'width=575,height=400,menubar=no,toolbar=no');
    }
}

export default PageController;
