'use strict';

class PronosticController {
    constructor ($scope, $element) {
        'ngInject';

        this.$scope = $scope;

        this.$scope.teams = ['', '', ''];
        this.ids = [undefined, undefined];
        this.flags = [undefined, undefined];

        _.each([].slice.call($element.get()[0].querySelectorAll('.pronostic object')), (o) => {
            o.addEventListener('load', () => {
                _.each([].slice.call(o.contentDocument.querySelectorAll('[id]')), (o) => {
                    if (o.tagName !== 'svg') {
                        o.style.cursor = 'pointer';

                        o.addEventListener('click', () => {
                            this.$scope.$apply(() => {
                                this.selectTeam(o.getAttribute('id'));
                            });
                        });
                    }
                });
            });
        });

        _.each([].slice.call($element.get()[0].querySelectorAll('.pronostic__finale__team object')), (o, i) => {
            o.addEventListener('load', () => {
                this.flags[i] = o.contentDocument;
                this.selectTeam('', i);

                this.flags[i].querySelector('svg').style.cursor = 'pointer';
                this.flags[i].querySelector('svg').addEventListener('click', () => {
                    this.$scope.$apply(() => {
                        this.selectWinner(i);
                    });
                });
            });
        });

        this.cup = $element.get()[0].querySelector('.pronostic__winner object');
        this.cup.addEventListener('load', () => {
            this.cup = this.cup.contentDocument;
            _.each([].slice.call(this.cup.querySelectorAll('svg > g[id]')), (o) => {

                o.style.display = 'none';
            });
        });

        this.$scope.reset = this.reset.bind(this);
        this.$scope.getHref = this.getHref.bind(this);
    }

    selectTeam (id, side) {
        if (side == null) { side = this.$scope.teams[0].length > 0 ? 1 : 0; }
        if (this.$scope.teams[side].length > 0) { return; }

        if (id.length > 0 && id === this.ids[0]) { return; }
        this.ids[side] = id;
        this.$scope.teams[side] = id.replace(/_/g, ' ').replace(' 1 ', '').trim();

        _.each([].slice.call(this.flags[side].querySelectorAll('[id]')), (o) => {
            if (o.tagName !== 'svg') {
                o.style.display = o.getAttribute('id') === id ? 'block' : 'none';
            }
        });
    }

    selectWinner (i, reset) {
        if ((this.ids[0].length > 0 && this.ids[1].length > 0) || reset) {
            _.each([].slice.call(this.cup.querySelectorAll('svg > g[id]')), (o) => {
                if (o.tagName !== 'svg') {
                    o.style.display = o.getAttribute('id') === this.ids[i] ? 'block' : 'none';
                }
            });
            this.$scope.teams[2] = this.$scope.teams[i];
        }
    }

    reset () {
        this.$scope.teams = ['', '', ''];
        this.ids = [undefined, undefined];
        this.selectTeam('', 0);
        this.selectTeam('', 1);
        this.selectWinner(1, true);
    }

    getHref () {
        let subject = encodeURIComponent('Jeu concours Euro le P\'tit Libé'),
            base = 'mailto:leptitlibe@liberation.fr?subject=' + subject;
        if (this.$scope.teams[0].length > 0 && this.$scope.teams[1].length > 0 && this.$scope.teams[2].length > 0) {
            base += '&body=' + encodeURIComponent(
                'Les deux équipes finalistes de l\'Euro seront : ' + this.$scope.teams[0] + ', ' + this.$scope.teams[1] + '\n' +
                'L\'équipe qui remportera l\'Euro sera : ' + this.$scope.teams[1] + '\n\n' +
                'Ton prénom : \n' +
                'Ton âge : \n');
        } else {
            base += '&body=' + encodeURIComponent(
                'Les deux équipes finalistes de l\'Euro seront : \n' +
                'L\'équipe qui remportera l\'Euro sera : \n\n' +
                'Ton prénom : \n' +
                'Ton âge : \n');
        }
        return base;
    }
}

export default PronosticController;
