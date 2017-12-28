'use-strict'
var app = angular.module("matrixSolving");

app.controller("mainCtrl", ['$scope', '$rootScope', 'helper', '$location', '$http', mainCtrl]);
function mainCtrl($scope, $rootScope, helper, $location, $http) {
    function init() {
        $scope.data = null;
    }
    init();

    $scope.changeLang = function (name) {
        $http.get('lib/lang/' + name + '.json').
            then(function onSuccess(response) {
                $rootScope.lang = response.data
            }).
            catch(function onError(response) {
                console.log(response);
            });
    }
    $scope.changeLang('vi');

    $scope.themeLight = true;

}