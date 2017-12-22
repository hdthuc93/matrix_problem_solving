'use-strict'
var app = angular.module("matrixSolving");

app.controller("markCtrl", ['$scope', '$rootScope', 'helper', '$location', '$http', markCtrl]);
function markCtrl($scope, $rootScope, helper, $location, $http) {
    function init() {
        $scope.data = null;
    }
    init();

}