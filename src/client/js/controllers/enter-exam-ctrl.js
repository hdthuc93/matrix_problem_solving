'use-strict'
var app = angular.module("matrixSolving");

app.controller("enterExamCtrl", ['$scope', '$rootScope', 'helper', '$location', '$http', enterExamCtrl]);
function enterExamCtrl($scope, $rootScope, helper, $location, $http) {
    function init() {
        $scope.data = null;
    }
    init();

}