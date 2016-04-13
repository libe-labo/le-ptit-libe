'use strict';

class CalendarController {
    constructor ($scope, $element) {
        'ngInject';

        this.current = 0;

        var i,
            days = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'],
            hoursDef = [
                [
                    [[6, 14], [14, 14]],
                    [[6, 14], [14, 14]],
                    [[6, 14], [14, 14]],
                    [[6, 14], [14, 14]],
                    [[6, 14], [14, 14]],
                    [[6, 6], [14, 14]],
                    [[6, 6], [14, 14]]
                ],
                [
                    [[9, 13], [14, 17]],
                    [[9, 13], [14, 17]],
                    [[9, 13], [14, 17]],
                    [[9, 13], [14, 17]],
                    [[9, 13], [14, 17]],
                    [[9,  9], [14, 14]],
                    [[9,  9], [14, 14]]
                ],
                [
                    [[11, 11], [19, 19]],
                    [[11, 11], [19, 19]],
                    [[11, 15], [19, 22]],
                    [[11, 15], [19, 22]],
                    [[11, 15], [19, 22]],
                    [[11, 15], [19, 22]],
                    [[11, 15], [19, 22]]
                ]
            ];

        var changeRange = function() {
            var inputs = [[6, 22], [0, 16]],
                output = [0, 100];
            return function(x, inputRangeId) {
                var input = inputs[inputRangeId || 0];
                return (
                    (x - input[0]) * (output[1] - output[0]) / (input[1] - input[0]) + output[0]
                );
            };
        }();

        var getLeft = function(idx) {
            return String(changeRange(idx)) + '%';
        };

        var getWidth = function(start, end) {
            if (start == null || end == null) {
                return '0%';
            }
            return String(changeRange(end - start, 1)) + '%';
        };

        // Setup
        var table = angular.element('<table>');
        table.append(angular.element('<tr>'));
        table.find('tr').append(angular.element('<td>', { width: '20%' }));
        table.find('tr').append(angular.element('<td>'));
        table.append(angular.element('<tr>'));
        $(table.find('tr')[1]).append(angular.element('<td>'));
        $(table.find('tr')[1]).append(angular.element('<td>'));
        table.prependTo($element);

        var digits = angular.element('<div>', { class: 'hours' });
        digits.appendTo(table.find('tr').first().find('td').last());

        var hours = angular.element('<div>', { class: 'hours' });
        hours.appendTo($(table.find('tr')[1]).find('td').last());
        for (i = 6; i <= 22; ++i) {
            var img = angular.element('<img>', {
                src: this.getInactiveRect()
            });
            img.css('left', getLeft(i));
            img.appendTo(hours);
        }

        for (i = 0; i < days.length; ++i) {
            var row = angular.element('<tr>');
            row.append(angular.element('<td>'));
            angular.element('<img>', { src: 'assets/images/8/calendar/' + days[i] + '.svg' })
                   .appendTo(row.find('td'));
            row.append(angular.element('<td>'));
            angular.element('<div>', { class: 'calendar' }).appendTo(row.find('td').last());
            angular.element('<div>', { class: 'calendar__inner' }).appendTo(row.find('.calendar'));
            angular.element('<div>', { class: 'calendar__inner' }).appendTo(row.find('.calendar'));

            row.appendTo(table);
        }

        this.update = function() {
            var j;
            var idx = this.current;
            var _digits = [];

            hours.find('img').each(function(that) {
                return function() {
                    $(this).attr('src', that.getInactiveRect());
                };
            }(this));

            digits.empty();

            for (i = 2; i < days.length + 2; ++i) {
                for (j = 0; j < 2; ++j) {
                    var start = hoursDef[idx][i - 2][j][0],
                    stop = hoursDef[idx][i - 2][j][1];

                    $(hours.find('img')[start - 6]).attr('src', this.getActiveRect());
                    $(hours.find('img')[stop - 6]).attr('src', this.getActiveRect());

                    $($(table.find('tr')[i]).find('.calendar__inner')[j]).css({
                        left: getLeft(start),
                        width: getWidth(start, stop)
                    });

                    _digits.push(start);
                    _digits.push(stop);
                }
            }

            _digits = _.uniq(_digits);
            for (j = 0; j < _digits.length; ++j) {
                var digit = angular.element('<span>', { class: 'digit color2-fg' });
                digit.css('left', getLeft(_digits[j]));
                digit.text(String(_digits[j]) + 'h');
                digits.append(digit);
            }
        };

        this.update();

        // Scope functions
        $scope.getSwitchSrc = this.getSwitchSrc.bind(this);
        $scope.select = this.select.bind(this);

        // Scope values
        $scope.buttons = [
            { label: 'Ouvrier' },
            { label: 'Banquier' },
            { label: 'Serveur' }
        ];
    }

    getRect (n) {
        return 'assets/images/8/calendar/elements-' + String(n) + '.svg';
    }

    getInactiveRect () {
        return this.getRect(_.sample([40, 42, 44]));
    }

    getActiveRect () {
        return this.getRect(_.sample([39, 43, 45]));
    }

    select (idx) {
        this.current = idx;
        this.update();
    }

    getSwitchSrc (idx) {
        var suffix = idx === this.current ? '-actif' : '';
        return 'assets/images/pictureswitch' + suffix + '.svg';
    }
}

export default CalendarController;
