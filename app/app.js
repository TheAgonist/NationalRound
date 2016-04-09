(function () {
    'use strict';

    angular
        .module('app', ['ui.router'])
        .config(config)
        .run(run);

    function config($stateProvider, $urlRouterProvider) {
        // default route
        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'home/index.html',
                controller: 'Home.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'home' }
            })
            .state('account', {
                url: '/account',
                templateUrl: 'account/index.html',
                controller: 'Account.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'account' }
            })
            .state('play', {
                url: '/play',
                templateUrl: 'play/index.html',
                controller: 'Play.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'play' }
            })
            .state('sheetMusic', {
                url: '/sheetMusic?bufferName',
                templateUrl: 'sheetMusic/index.html',
                controller: 'sheetMusic.IndexController',
                controllerAs: 'vm',
                /*resolve: {
                    songs: 
                        ['$http','$stateParams',function($http, $stateParams){
                           console.log($stateParams);
                           return $http.get('/img/Metallica-FadeToBlack.mid').then(function(song){
                                //console.log(song.data);
                                return song.data;
                            });
                        }]
                },*/
                data: { activeTab: 'sheetMusic' }
            })
            .state('upload', {
                url: '/upload',
                templateUrl: 'uploadFile/index.html',
                controller: 'Upload.IndexController',
                data: { activeTab: 'upload' }
            })
            .state('generator', {
                url: '/generator',
                templateUrl: 'generator/index.html',
                controller: 'Generator.IndexController',
                controllerAs :'vm',
                data: { activeTab: 'generator' }
            });
    }

    function run($http, $rootScope, $window) {
        // add JWT token as default auth header
        $http.defaults.headers.common['Authorization'] = 'Bearer ' + $window.jwtToken;

        // update active tab on state change
        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            $rootScope.activeTab = toState.data.activeTab;
        });
    }
    // manually bootstrap angular after the JWT token is retrieved from the server
    $(function () {
        // get JWT token from server
        $.get('/app/token', function (token) {
            window.jwtToken = token;

            angular.bootstrap(document, ['app']);
        });
    });
})();
