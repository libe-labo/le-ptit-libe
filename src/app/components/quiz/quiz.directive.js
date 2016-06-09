'use strict';

export function QuizDirective() {
    'ngInject';

    let directive = {
        restrict: 'E',
        templateUrl: 'app/components/quiz/quiz.html',
        link: linkFunc,
        controller: QuizController,
        controllerAs: 'quiz',
        bindToController: true
    };

    function linkFunc() { }

    return directive;
}

class QuizController {
    constructor ($scope, $http) {
        'ngInject';

        this.quiz = [];
        this.current = 0;

        this.sentences = [
            ['Aïe,', 'tu n’as peut-être pas tout compris. Peut-être devrais-tu ' +
                     'relire calmement le dossier&nbsp;?'],
            ['C’est pas mal,', 'mais as-tu bien tout lu&nbsp;?'],
            ['Bravo,', 'c\'est presque un sans-faute&nbsp;!'],
            ['Bravo,', 'tu as tout compris&nbsp;!']
        ];

        $scope.getCurrentQuestion = this.getCurrentQuestion.bind(this);
        $scope.isCurrentQuestionAnswered = this.isCurrentQuestionAnswered.bind(this);
        $scope.isCurrentQuestionOk = this.isCurrentQuestionOk.bind(this);
        $scope.getAnswerClass = this.getAnswerClass.bind(this);
        $scope.answerCurrentQuestion = this.answerCurrentQuestion.bind(this);
        $scope.nextQuestion = this.nextQuestion.bind(this);
        $scope.hasEnded = this.hasEnded.bind(this);
        $scope.getScore = this.getScore.bind(this);
        $scope.getResultSentence = this.getResultSentence.bind(this);
        $scope.restart = this.restart.bind(this);

        $http.get('assets/quiz.tsv').then(response => {
            if (response.status === 200) {
                response.data = window.d3_dsv.tsvParse(response.data, (d, idx) => {
                    return {
                        idx: idx,
                        question: d.Titre,
                        answers: [
                            d['Reponse 1'], d['Reponse 2'], d['Reponse 3']
                        ],
                        ok: parseInt(d['Bonne reponse']) - 1,
                        answered: false,
                    };
                });
            }

            this.quiz = response.data;
            $scope.quizLength = this.quiz.length;
        });

        this.$scope = $scope;
    }

    getCurrentQuestion () {
        if (this.quiz.length >= this.current + 1) {
            return this.quiz[this.current];
        }
        return {};
    }

    isCurrentQuestionAnswered () {
        return !isNaN(parseInt(this.getCurrentQuestion().answered));
    }

    isCurrentQuestionOk () {
        return this.isCurrentQuestionAnswered() &&
               this.getCurrentQuestion().answered === this.getCurrentQuestion().ok;
    }

    getAnswerClass (answerIdx) {
        let ok = answerIdx === this.getCurrentQuestion().ok,
            isTheOneAnswered = answerIdx === this.getCurrentQuestion().answered;
        return {
            'color2-fg': this.isCurrentQuestionAnswered() && ok,
            'bad': this.isCurrentQuestionAnswered() && !ok && isTheOneAnswered,
            'strikethrough': this.isCurrentQuestionAnswered() && !ok && isTheOneAnswered
        };
    }

    answerCurrentQuestion (answerIdx) {
        if (isNaN(parseInt(this.getCurrentQuestion().answered))) {
            this.quiz[this.current].answered = answerIdx;

            // Update arrows' color
            this.changeArrowColor(answerIdx, '#c6c6c6');
            this.changeArrowColor(
                this.quiz[this.current].ok,
                this.$scope.getBackgroundColor()['background-color']
            );
        }
    }

    nextQuestion () {
        if (!isNaN(parseInt(this.getCurrentQuestion().answered))) {
            this.changeArrowColor(0, '');
            this.changeArrowColor(1, '');
            this.changeArrowColor(2, '');
            ++this.current;
        }
    }

    hasEnded () {
        return this.quiz.length > 0 && this.current >= this.quiz.length;
    }

    getScore () {
        let n = 0;
        for (let i = 0; i < this.quiz.length; ++i) {
            if (this.quiz[i].answered === this.quiz[i].ok) {
                ++n;
            }
        }
        return n;
    }

    getResultSentence (idx) {
        idx = idx || 0;
        let score = this.getScore();

        return this.sentences[
            score > 9
                ? 3
                : score >= 7
                    ? 2
                    : score >= 5
                        ? 1
                        : 0
        ][idx];
    }

    restart () {
        for (let i = 0; i < this.quiz.length; ++i) {
            this.quiz[i].answered = false;
        }
        this.current = 0;
    }

    changeArrowColor (idx, color) {
        $($('.quiz li object').eq(idx)[0].contentDocument).find('.st12').css({
            fill: color
        });
    }
}
