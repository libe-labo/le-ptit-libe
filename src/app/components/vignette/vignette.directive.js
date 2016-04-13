'use strict';

export function VignetteDirective() {
    'ngInject';

    let directive = {
        restrict: 'E',
        templateUrl: 'app/components/vignette/vignette.html',
        scope: {
            imageSrc: '=',
            articleId: '='
        },
        link: linkFunc,
        controller: VignetteController,
        controllerAs: 'vignette',
        bindToController: true
    };

    function linkFunc(scope, el) {
        let color = '#73b72b',
            svg = $('<object>').attr('type', 'image/svg+xml')
                               .attr('data', scope.vignette.imageSrc);
        svg.appendTo($(el));
        svg.on('load', function() {
            let svg = $(this.getSVGDocument()).find('svg'),
                defs = svg.find('defs');

            let makeSVGTag = function(tag, attrs) {
                let el = document.createElementNS('http://www.w3.org/2000/svg', tag);
                for (var k in attrs) { if (attrs.hasOwnProperty(k)) {
                    el.setAttribute(k, attrs[k]);
                } }
                return el;
            };

            if (defs.length < 1) {
                defs = $(makeSVGTag('defs')).prependTo(svg);
            }

            $(makeSVGTag('clipPath', { id : 'clip' }))
                .appendTo(defs)
                .append(makeSVGTag('circle', {
                    r : 50,
                    cx : '50%',
                    cy : '50%'
                }));

            svg.find('*').each(function() {
                if ($(this).attr('id') != null && $(this).attr('id') !== 'clip') {
                    this.setAttribute('class', '');
                    this.setAttribute('fill', color);
                    this.setAttribute('clip-path', 'url(#clip)');
                }
            });

            // We're making closures cause it's clean and nice >:3
            (function() {
                let r = 0,
                    maxR = $(el).find('object').outerHeight() * 2,
                    timeout = maxR / 3000,
                    updateR = function() {
                        r += 1;
                        svg.find('defs circle')[0].setAttribute('r', r);
                        if (r < maxR) {
                            window.setTimeout(updateR, timeout);
                        }
                    };
                window.setTimeout(updateR, timeout);
            })();

            scope.$emit('vLoaded');
        });
    }

    return directive;
}

class VignetteController {
    constructor ($stateParams) {
        'ngInject';

        this.$stateParams = $stateParams;
    }
}
