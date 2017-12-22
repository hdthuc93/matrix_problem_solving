'use-strict'
var app = angular.module("matrixSolving");

app.controller("regulationCtrl", ['$scope', '$rootScope', 'helper', '$location', '$http', regulationCtrl]);
function regulationCtrl($scope, $rootScope, helper, $location, $http) {
    function init() {
        $scope.data = null;
    }
    init();

}