'use strict';

class PageController {
    constructor ($scope, $stateParams, $state) {
        'ngInject';

        this.$stateParams = $stateParams;
        this.$state = $state;

        $scope.getCurrentRelease = this.getCurrentRelease.bind(this);
        $scope.getBodyStyle = this.getBodyStyle.bind(this);
        $scope.getBodyClass = this.getBodyClass.bind(this);
        $scope.getCartelStyle = this.getCartelStyle.bind(this);
        $scope.shareOnFacebook = this.shareOnFacebook.bind(this);
        $scope.getDownloadHref = this.getDownloadHref.bind(this);
        $scope.getOtherN = this.getOtherN.bind(this);

        this.colors = [
            [],
            ['#f2a73b', '#e85a24', '#faebd9'],
            ['#abba3e', '#045b2e', '#eceed2']
        ];

        $scope.$root.$on('$stateChangeStart', function(ev, toState, toParams) {
            if (toState.name === 'menu' && [1].indexOf(parseInt(toParams.release)) < 0) {
                ev.preventDefault();
                $state.go('menu', { release : '1' }, { reload : true });
            }
        });
    }

    getCurrentRelease () {
        return this.$stateParams.release;
    }

    getBodyStyle () {
        if (this.$stateParams.release == null) { return { }; }

        var bgImg = `linear-gradient(${this.colors[this.$stateParams.release][0]},` +
                    `${this.colors[this.$stateParams.release][1]})`;

        if (!this.$state.is('newsletter')) {
            bgImg = `url(assets/images/background-${this.$stateParams.release}.svg),` + bgImg;
        }

        return {
            'background-color' : this.colors[this.$stateParams.release][1],
            'background-image' : bgImg,
            'background-position' : `center bottom ${$('.footer').outerHeight() * 1.5}px`
        };
    }

    getBodyClass () {
        return `release-${this.$stateParams.release}`;
    }

    getCartelStyle () {
        return {
            'background-color' : this.colors[this.$stateParams.release][2]
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

    getOtherN () {
        return this.$stateParams.release === '1' ? 2 : 1;
    }
}

export default PageController;
