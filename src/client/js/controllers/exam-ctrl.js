'use-strict'
var app = angular.module("matrixSolving");

app.controller("examCtrl", ['$scope', '$rootScope', 'helper', '$location', '$http', examCtrl]);
function examCtrl($scope, $rootScope, helper, $location, $http) {
    function init() {
        $scope.data = null;
    }
    init();

}