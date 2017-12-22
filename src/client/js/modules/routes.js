'use strict';
angular.module('matrixSolving').config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
    function ($stateProvider, $urlRouterProvider, $locationProvider) {
        $locationProvider.hashPrefix('');/*remove new hash prefix from angular 1.6*/
        $urlRouterProvider.when('', '/');
        $urlRouterProvider.otherwise('/404');

        // Application routes
        $stateProvider
            .state('index', {
                url: '/',
                templateUrl: 'templates/dashboard.html'
            })
            .state('404', {
                url: '/404',
                templateUrl: 'templates/404.html'
            })
            .state('taskList', {
                url: '/task',
                templateUrl: 'templates/task-list.html'
            })
            .state('createTask', {
                url: '/create-task',
                templateUrl: 'templates/create-task.html'
            })
    }
]).factory('User', [function () {
    return {
        isAuthenticated: false
    };
}]).factory('RouteValidator', ['$rootScope', 'Auth', '$state', function ($rootScope, Auth, $state) {

    return {
        init: init
    };

    function init() {
        //$rootScope.$on('$stateChangeStart', _onStateChangeStart);
    }

    function _onStateChangeStart(event, toState, toParams, fromState, fromParams) {
        var toStateRequiresRoleAdmin = _requiresRoleAdmin(toState);
        //role = 0: user, role = 1: admin
        if ($rootScope.masterUserRole == 0 && toStateRequiresRoleAdmin) {
            event.preventDefault();
            $state.go('404');
            return;
        }
        //If logged in & direct to '/login'
        if (Auth.isLoggedIn() && toState.data && toState.data.preventLoggedIn) {
            event.preventDefault();
            return;
        }
    }

    function _requiresRoleAdmin(toState) {
        if (angular.isUndefined(toState.data) || !toState.data.requiresRoleAdmin) {
            return false;
        }
        return toState.data.requiresRoleAdmin;
    }

}]).run(['RouteValidator', function (RouteValidator) {
    RouteValidator.init();
}]);
