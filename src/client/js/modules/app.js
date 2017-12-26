var app = angular.module("matrixSolving", [
    'ui.bootstrap',
    'ui.router', 'ui.router.state.events',
    'ngCookies',
    'ui.grid',
    'ui.grid.selection',
    'ui.grid.resizeColumns',
    'ui.grid.edit',
    'ui.grid.rowEdit',
    'ui.grid.cellNav', 'ui.grid.pinning',
    'mod.helper',
    'ngFileUpload', 'ngSanitize']);
module.factory('Auth', ['$cookieStore', '$rootScope', function ($cookieStore, $rootScope) {
    var user;
    return {
        getUser: function () {
            return $cookieStore.get("userdata");
        },
        isLoggedIn: function () {
            if ($cookieStore.get('userdata')) {
                var data = $cookieStore.get('userdata');
                var expireDate = new Date(data.expire);
                var currentDate = new Date();
                if(expireDate<currentDate){
                    return false;
                }
                if(data.loggedIn){
                    $rootScope.userData = angular.copy(data);
                    return true;
                }else{
                    return false;
                    $rootScope.userData = null;
                }
                return false;
            } else {
                return false;
            }
        }
    }
}]).run(['$rootScope', '$location', 'Auth', '$http', function ($rootScope, $location, Auth, $http) {
    $rootScope.$on('$locationChangeStart', function (event) {
        if (!Auth.isLoggedIn()) {
            $location.path('/login');
            $rootScope.isLoggedIn = false;
        }
        else {
            $rootScope.userData = Auth.getUser();
        }
    });
}]);

