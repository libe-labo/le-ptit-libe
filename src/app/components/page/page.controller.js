'use strict';

class PageController {
    constructor ($scope, $stateParams, $state) {
        'ngInject';

        $scope.releaseN = 10;

        this.$stateParams = $stateParams;
        this.$state = $state;

        $scope.getVignetteColor = this.getVignetteColor.bind(this);
        $scope.getBodyStyle = this.getBodyStyle.bind(this);
        $scope.shareOnFacebook = this.shareOnFacebook.bind(this);
        $scope.shareOnTwitter = this.shareOnTwitter.bind(this);
        $scope.getBackgroundColor =  this.getBackgroundColor.bind(this);

        let selectorsToColor = {
            'body': ['background-color', 'light'],
            'body .container > div': ['background-color', 'cartel']
        };
        this.colors = {};
        for (let i = 0; i < document.styleSheets.length; ++i) {
            let stylesheet = document.styleSheets[i];
            if (stylesheet.href == null) { continue; }
            if (stylesheet.href.match(/(index)|(app-\w+)\.css$/) != null) {
                for (let j = 0; j < stylesheet.cssRules.length; ++j) {
                    for (let k in selectorsToColor) {
                        if (stylesheet.cssRules[j].selectorText === k) {
                            this.colors[selectorsToColor[k][1]] =
                                stylesheet.cssRules[j].style[selectorsToColor[k][0]];
                        }
                    }

                    if (Object.keys(this.colors).length >= 2) { break; }
                }
            }
        }
        this.colors.dark = '#cb9932';

        this.$scope = $scope;
    }

    getVignetteColor () {
        return '#264c87';
    }

    getBodyStyle () {
        var bgImg = `linear-gradient(${this.colors.light}, ${this.colors.dark})`;

        if (!this.$state.is('newsletter')) {
            bgImg = `url(assets/images/background.svg), ${bgImg}`;
        }

        return {
            'background-color': this.colors.dark,
            'background-image': bgImg,
            'background-position': `center bottom ${$('.footer').outerHeight() * 1.5}px`
        };
    }

    shareOnFacebook () {
        var url = encodeURIComponent(window.location.origin + window.location.pathname),
            link = 'http://www.facebook.com/sharer/sharer.php?u=' + url;
        window.open(link, '', 'width=575,height=400,menubar=no,toolbar=no');
    }

    shareOnTwitter () {
        var url = encodeURIComponent(window.location.origin + window.location.pathname),
            text = 'Le P\'tit Libé n°' + this.$scope.releaseN +
                   ' : L\'Euro de foot expliqué aux enfants' +
                   ' ' + url + ' via @LePtitLibe',
            link = 'https://twitter.com/intent/tweet?original_referer=&text=' + text;
        window.open(link, '', 'width=575,height=400,menubar=no,toolbar=no');
    }

    getBackgroundColor () {
        return {
            'background-color': this.colors.light
        };
    }
}

export default PageController;
