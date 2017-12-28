var app = angular.module('matrixSolving')
app.controller('createTaskCtrl', ['$scope', '$cookieStore', '$http', '$rootScope', '$timeout', '$location', 'helper', createTaskCtrl]);

function createTaskCtrl($scope, $cookieStore, $http, $rootScope, $timeout, $location, helper) {

  $scope.cellLimit = /^(0|9)\d{2}$/;
  $scope.equationVariables = ['x', 'y', 'z', 't', 'u', 'v', 'k', 'l', 'm', 'xx', 'yy', 'zz', 'tt', 'uu', 'vv', 'kk', 'll', 'mm'];

  $scope.getTypeList = function () {
    $http.get("/api/problems/type", {
      headers: {
        "token": $rootScope.userData.token
      }
    )
      .then(function (response) {
        $scope.taskTypeList = response.data.data;
      });
  }

  console.log()

  $scope.getHardLevelList = function () {
    $http.get("/api/problems/constant", {
      headers: {
        "token": $rootScope.userData.token
      }
    })
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

    var content = [];

    if ($scope.data.taskType == 1 || $scope.data.taskType == 2) {
      content.push(getMatrixData("#type1type2 #matrix-1"));
      content.push(getMatrixData("#type1type2 #matrix-2"));
    }

    if ($scope.data.taskType == 3) {
      content.push(getMatrixData("#type3 #matrix-1"));
      content.push(getMatrixData("#type3 #matrix-2"));
    }

    if ($scope.data.taskType == 4) {
      content.push(getMatrixData("#type4 #matrix-1"));
    }

    if ($scope.data.taskType == 5) {
      content.push(getMatrixData("#type5 #matrix-1"));
    }

    if (content.length) {
      var data = {
        content: content,
        problem_type_id: angular.copy(parseInt($scope.data.taskType)),
        constant_id: angular.copy(parseInt(angular.fromJson($scope.data.hardLevel).id)),
        token: $rootScope.userData.token
      }      

      $http.post("/api/problems", data)
        .then(function (response) {
          var msg = response.data.success ? $scope.lang.task.create.save.success : $scope.lang.task.create.save.fail;
          helper.popup.info({ title: $scope.lang.label.popupInfo, message: msg, close: function () { return; } })
          if (response.data.success) {
            init();
            $scope.taskInfoForm.$setPristine();
            $scope.taskInfoForm.$setUntouched();
            $scope.taskDetailForm.$setPristine();
            $scope.taskDetailForm.$setUntouched();
          }
        });
    }
  }

  function getMatrixData(url) {
    var matrixRows = angular.element("#matrix-area " + url + " tr");
    var matrix = [];
    for (row = 0; row < matrixRows.length; row++) {
      var rowData = [];
      for (var col = 0; col < matrixRows[row]["cells"].length; col++) {
        rowData.push(parseInt(matrixRows[row]["cells"][col]["lastElementChild"]["value"]));
      }
      matrix.push(rowData);
    }
    return matrix;
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



