'use-strict'
var app = angular.module("matrixSolving");

app.controller("solveTaskCtrl", ['$scope', '$rootScope', 'helper', '$location', '$http', solveTaskCtrl]);
function solveTaskCtrl($scope, $rootScope, helper, $location, $http) {
    function init() {
        $scope.data = null;
    }
    init();

}