'use strict';

import config from './index.config';
import routerConfig from './index.route';

import runBlock from './index.run';

import PageController from './components/page/page.controller';
import HeaderController from './components/header/header.controller';
import MenuController from './components/menu/menu.controller';
import MainController from './main/main.controller';
import ArticleController from './article/article.controller';
import ResourcesController from './resources/resources.controller';
import NewsletterController from './newsletter/newsletter.controller';
import PronosticController from './articles/pronostic.controller';

import { VignetteDirective } from './components/vignette/vignette.directive';
import { QuizDirective } from './components/quiz/quiz.directive';
import { PictureSwitchDirective } from './components/pictureSwitch/pictureSwitch.directive';
import { AccordionnDirective } from './components/accordionn/accordionn.directive';
import { TrombiDirective } from './components/trombi/trombi.directive';
import { SvgWithLabelsDirective } from './components/svgwithlabels/svgwithlabels.directive';

angular.module('ptitlibe', ['angulartics', 'angulartics.google.analytics',
                            'ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize',
                            'ui.router', 'ui.bootstrap'])

       .config(config)
       .config(routerConfig)

       .run(runBlock)

       .controller('PageController', PageController)
       .controller('HeaderController', HeaderController)
       .controller('MenuController', MenuController)
       .controller('MainController', MainController)
       .controller('ArticleController', ArticleController)
       .controller('ResourcesController', ResourcesController)
       .controller('NewsletterController', NewsletterController)
       .controller('PronosticController', PronosticController)

       .directive('vignette', VignetteDirective)
       .directive('quiz', QuizDirective)
       .directive('pictureswitch', PictureSwitchDirective)
       .directive('accordionn', AccordionnDirective)
       .directive('trombi', TrombiDirective)
       .directive('svgwithlabels', SvgWithLabelsDirective);
