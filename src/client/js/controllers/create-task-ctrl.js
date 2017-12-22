var app = angular.module('matrixSolving')
app.controller('createTaskCtrl', ['$scope', '$cookieStore', '$http', '$rootScope', '$timeout', '$location', 'helper', createTaskCtrl]);

function createTaskCtrl($scope, $cookieStore, $http, $rootScope, $timeout, $location, helper) {

  $scope.cellLimit = /^(0|9)\d{2}$/;
  
  $scope.getTypeList = function () {
    $http.get("/api/problems/type")
      .then(function (response) {
        $scope.taskTypeList = response.data.data;
      });
  }

  $scope.getHardLevelList = function () {
    $http.get("/api/problems/constant")
      .then(function (response) {
        $scope.hardLevelList = response.data.data;
      });
  }

  function init() {
    $scope.data = {
      taskType: "",
      hardLevel: "",
      matrixRow: 0,
      matrixCol: 0,
    }
    // $scope.taskTypeList = [{
    //   id: 1, type_name: "Cộng ma trận"
    // }, {
    //   id: 2, type_name: "Trừ ma trận"
    // }, {
    //   id: 3, type_name: "Nhân ma trận"
    // }, {
    //   id: 4, type_name: "Tính định thức"
    // }, {
    //   id: 5, type_name: "Giải hệ Phương trình Kramer"
    // }]

    // $scope.hardLevelList = [{
    //   id: 1, lv_name: "Dễ"
    // }, {
    //   id: 2, lv_name: "Vừa"
    // }, {
    //   id: 3, lv_name: "Khó"
    // }]
    $scope.getTypeList();
    $scope.getHardLevelList();
  }
  init();

  $scope.getNumber = function (num) {
    if (parseInt(num) > 0) {
      return new Array(parseInt(num));
    }
    return [];
  }

  $scope.save = function () {
    if ($scope.taskInfoForm.$error.required && $scope.taskInfoForm.$error.required.length > 0) {
      $scope.taskInfoForm[$scope.taskInfoForm.$error.required[0].$name].$touched = true;
      return false;
    }
    // var matrixArea = angular.element('#matrix-area');
    // if ($scope.data.taskType == 1) {
    //   matrixArea.html('<option value="{{lv.id}}" ng-repeat="lv in hardLevelList">{{lv.lv_name}}</option>');
    // }

  }

  $scope.changeLevel = function () {
    $scope.matrixSize = [];
    var arr = [];
    var data = angular.copy(angular.fromJson($scope.data.hardLevel));
    for (var i = data.min_size; i <= data.max_size; i++) {
      arr.push({ id: i, value: i });
    }
    $scope.matrixSize = arr;
  }

}



