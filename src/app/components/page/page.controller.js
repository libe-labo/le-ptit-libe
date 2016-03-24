'use strict';

class PageController {
    constructor ($scope, $stateParams, $state) {
        'ngInject';

        this.$stateParams = $stateParams;
        this.$state = $state;

        $scope.getBodyStyle = this.getBodyStyle.bind(this);
        $scope.getCartelStyle = this.getCartelStyle.bind(this);
        $scope.shareOnFacebook = this.shareOnFacebook.bind(this);
        $scope.shareOnTwitter = this.shareOnTwitter.bind(this);
        $scope.getDownloadHref = this.getDownloadHref.bind(this);

        this.colors = [
            '#a5cde3', '#76a9c6', '#fff'
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

    shareOnTwitter () {
        var url = encodeURIComponent(window.location.origin + window.location.pathname),
            text = 'Le P\'tit Libé n°7 : ' + $('.release-title__title').html().replace(/\<br\>/g, ' ') + ' ' + url + ' via @LePtitLibe',
            link = 'https://twitter.com/intent/tweet?original_referer=&text=' + text;
        window.open(link, '', 'width=575,height=400,menubar=no,toolbar=no');
    }
}

export default PageController;
