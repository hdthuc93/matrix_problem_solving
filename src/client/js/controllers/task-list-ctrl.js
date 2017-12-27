var app = angular.module('matrixSolving')
app.controller('taskListCtrl', ['$scope', '$cookieStore', '$http', '$rootScope', '$timeout', '$location', 'helper', taskListCtrl]);

function taskListCtrl($scope, $cookieStore, $http, $rootScope, $timeout, $location, helper) {
  $scope.cellLimit = /^(0|9)\d{2}$/;
  $scope.equationVariables = ['x', 'y', 'z', 't', 'u', 'v', 'k', 'l', 'm', 'xx', 'yy', 'zz', 'tt', 'uu', 'vv', 'kk', 'll', 'mm'];
  
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
    $scope.datatSearch = {
      taskType: "",
      hardLevel: ""
    }
    getTaskList({});
    $scope.getTypeList();
    $scope.getHardLevelList();
  }
  init();

  $scope.search = function () {
    getTaskList($scope.datatSearch);
  }

  $scope.taskList = {
    minRowsToShow: 15,
    enableSorting: false,
    enableRowSelection: true,
    multiSelect: false,
    enableColumnResizing: true,
    selectionRowHeaderWidth: 35,
    columnDefs: [
      { field: 'no', displayName: $scope.lang.task.list.grid.no, width: 40 },
      {
        field: 'no', displayName: $scope.lang.task.list.grid.matrix1, minWidth: 80,
        cellTemplate: '<div class="ui-grid-cell-contents"><button ng-show="{{row.entity.content[0]}}" type="button" style="padding: 0px 5px;" class="btn btn-default" ng-click="grid.appScope.viewMatrix(row.entity.content[0]||[], row.entity.problem_type.type_index||null)"><i class="fa fa-eye"></i></button></div>'
      },
      {
        field: 'no', displayName: $scope.lang.task.list.grid.matrix2, minWidth: 80,
        cellTemplate: '<div class="ui-grid-cell-contents"><button ng-show="{{row.entity.content[1]}}" type="button" style="padding: 0px 5px;" class="btn btn-default" ng-click="grid.appScope.viewMatrix(row.entity.content[1]||[])"><i class="fa fa-eye"></i></button></div>'
      },
      { field: 'problem_type.type_name', displayName: $scope.lang.task.list.grid.type, minWidth: 100 },
      {
        field: 'constant_name', displayName: $scope.lang.task.list.grid.level, minWidth: 60,
        cellTemplate: '<div class="ui-grid-cell-contents" ng-class="{\'bg-success\': row.entity.constant.level == 1, \'bg-warning\': row.entity.constant.level == 2, \'bg-danger\': row.entity.constant.level == 3}">{{row.entity.constant_name}}</div>'
      },
      {
        field: 'action', displayName: $scope.lang.task.list.grid.action, minWidth: 100, maxWidth: 120,/* pinnedRight: true,*/
        cellTemplate: '<div class="ui-grid-cell-contents"><button ng-show="{{!row.entity.is_public}}" type="button" style="padding: 0px 5px;" class="btn btn-default" ng-click="grid.appScope.postSolution(row.entity)"><i class="fa fa-file"></i></button></div>'
      }
    ],
    onRegisterApi: function (gridApi) {
      $scope.gridApi = gridApi;
      gridApi.selection.on.rowSelectionChanged($scope, function (row) {
        if (row.isSelected) {
          $scope.selectedRow = row.entity;
        } else {
          $scope.selectedRow = null;
        }
      });
    }
  };

  var constant = [$scope.lang.task.create.level1, $scope.lang.task.create.level2, $scope.lang.task.create.level3];

  function getTaskList(param) {
    var type = param.taskType || -1;
    var hardLevel = -1;
    if (param.hardLevel) {
      hardLevel = angular.fromJson(param.hardLevel) ? parseInt(angular.fromJson(param.hardLevel).id) : -1;
    }
    $http.get("/api/problems/type/" + type + "/constant/" + hardLevel)
      .then(function (response) {
        var data = response.data.data;
        data.forEach(function (e, i) {
          data[i] = e;
          data[i].no = i + 1;
          data[i].constant_name = constant[data[i]["constant"]["level"] - 1];
        });
        $scope.taskList.data = data;
      });
  }

  $scope.viewMatrix = function (data, type) {
    $scope.matrixData = data;
    var content = "<table align='center' width='100%'>";
    if (type == 5) {
      var equationVariables = ['x', 'y', 'z', 't', 'u', 'v', 'k', 'l', 'm', 'xx', 'yy', 'zz', 'tt', 'uu', 'vv', 'kk', 'll', 'mm']

      for (var row = 0; row < data.length; row++) {
        content += "<tr><td>";
        for (var col = 0; col < data[row].length; col++) {
          content = content + ((data[row][col] > 0 && col > 0 && data[row].length - 1 > col) ? "+" : "") + (data[row].length - 1 == col ? " =" : "") + " " + data[row][col] + (data[row].length - 1 > col ? equationVariables[col] : "");
        }
        content += "</td></tr>";
      }
      content += "</table>"
    } else {
      var content = "<table align='center' class='table-bordered'>";
      for (var row = 0; row < data.length; row++) {
        content += "<tr>";
        for (var col = 0; col < data[row].length; col++) {
          content = content + "<td class='matrix-cell' width='40'>" + data[row][col] + "</td>"
        }
        content += "</tr>";
      }
    }
    content += "</table>"
    helper.popup.info({ title: $scope.lang.task.list.matrixInfo, message: content, close: function () { return; } })
  }

  $scope.getNumber = function (num) {
    if (parseInt(num) > 0) {
      return new Array(parseInt(num));
    }
    return [];
  }

  $scope.postSolution = function (row) {
    $("#modalSolution").modal();
    console.log("du lieu row", row)
    $scope.solution = {};
    $scope.solution.type = row.problem_type.type_index;
    if ($scope.solution.type == 1 || $scope.solution.type == 2) {/*CONG - TRU*/
      $scope.solution.row = row.content[0].length;
      $scope.solution.col = row.content[0][0].length;
    }
    if ($scope.solution.type == 3) {/*NHAN*/
      $scope.solution.row = row.content[0].length;
      $scope.solution.col = row.content[1][0].length;
    }
    if ($scope.solution.type == 4) {/*DINH THUC*/
      $scope.solution.rowCol = row.content[0].length;
    }
    if ($scope.solution.type == 5) {/*KRAMER*/
      $scope.solution.variables = row.content[0].length;
    }
    console.log(77777, $scope.solution)

  }

  $scope.saveSolution = function () {
    $scope.solution = {};
  }

}



