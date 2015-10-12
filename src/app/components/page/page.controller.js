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
