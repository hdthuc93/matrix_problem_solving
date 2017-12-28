var app = angular.module('matrixSolving')
app.controller('taskListCtrl', ['$scope', '$cookieStore', '$http', '$rootScope', '$timeout', '$location', 'helper', taskListCtrl]);

function taskListCtrl($scope, $cookieStore, $http, $rootScope, $timeout, $location, helper) {
  $scope.cellLimit = /^(0|9)\d{2}$/;
  $scope.equationVariables = ['x', 'y', 'z', 't', 'u', 'v', 'k', 'l', 'm', 'xx', 'yy', 'zz', 'tt', 'uu', 'vv', 'kk', 'll', 'mm'];

  $scope.getTypeList = function () {
    $http.get("/api/problems/type", {
      headers: {
        "token": $rootScope.userData.token
      }
    })
      .then(function (response) {
        $scope.taskTypeList = response.data.data;
      });
  }

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
      // {
      //   field: 'action', displayName: $scope.lang.task.list.grid.action, minWidth: 100, maxWidth: 120,/* pinnedRight: true,*/
      //   cellTemplate: '<div class="ui-grid-cell-contents"><button ng-show="{{!row.entity.is_public&&grid.appScope.userData.role != 3}}" type="button" style="padding: 0px 5px;" class="btn btn-default" ng-click="grid.appScope.postSolution(row.entity)"><i class="fa fa-file-text-o"></i></button> <button ng-show="{{row.entity.is_public}}" type="button" style="padding: 0px 5px;" class="btn btn-default" ng-click="grid.appScope.getSolution(row.entity)"><i class="fa fa-file-text"></i></button></div>'
      // }
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
    $http.get("/api/problems/type/" + type + "/constant/" + hardLevel, {
      headers: {
        "token": $rootScope.userData.token
      }
    })
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

  $scope.viewTask = function (row) {
    var content = "";
    var array = [$scope.lang.label.addition, $scope.lang.label.subtraction, $scope.lang.label.multiplication]
    if (row.problem_type.type_index == 1) {
      content += "<p class='text-center header'>" + $scope.lang.task.list.taskType.addition + "</p>";
    }
    if (row.problem_type.type_index == 2) {
      content += "<p class='text-center header'>" + $scope.lang.task.list.taskType.subtraction + "</p>";
    }
    if (row.problem_type.type_index == 3) {
      content += "<p class='text-center header'>" + $scope.lang.task.list.taskType.multiplication + "</p>";
    }
    if (row.problem_type.type_index == 4) {
      content += "<p class='text-center header'>" + $scope.lang.task.list.taskType.determinant + "</p>";
    }
    if (row.problem_type.type_index == 5) {
      content += "<p class='text-center header'>" + $scope.lang.task.list.taskType.kramer + "</p>";
    }
    if (row.content[0]) {
      content += renderMatrix(row.content[0], row.problem_type.type_index);
    }
    if (row.content[1]) {
      content += "<p></p><p class='text-center'>" + array[row.problem_type.type_index - 1] + "</p>"
      content += renderMatrix(row.content[1], row.problem_type.type_index);
    }
    helper.popup.info({ title: $scope.lang.task.list.taskInfo, message: content, close: function () { return; } });
  }

  $scope.viewMatrix = function (data, type) {
    var content = renderMatrix(data, type);
    helper.popup.info({ title: $scope.lang.task.list.matrixInfo, message: content, close: function () { return; } })
  }

  function renderMatrix(data, type) {
    if (type == 5) {
      var content = "<table align='center' width='100%'>";
      var equationVariables = ['x', 'y', 'z', 't', 'u', 'v', 'k', 'l', 'm', 'xx', 'yy', 'zz', 'tt', 'uu', 'vv', 'kk', 'll', 'mm'];
      for (var row = 0; row < data.length; row++) {
        content += "<tr><td>";
        for (var col = 0; col < data[row].length; col++) {
          content = content + ((data[row][col] > 0 && col > 0 && data[row].length - 1 > col) ? "+" : "") + (data[row].length - 1 == col ? " =" : "") + " " + data[row][col] + (data[row].length - 1 > col ? equationVariables[col] : "");
        }
        content += "</td></tr>";
      }
      content += "</table>";
      return content;
    } else {
      var content = "<table align='center' class='table-bordered'>";
      for (var row = 0; row < data.length; row++) {
        content += "<tr>";
        for (var col = 0; col < data[row].length; col++) {
          content = content + "<td class='matrix-cell' width='40'>" + data[row][col] + "</td>"
        }
        content += "</tr>";
      }
      content += "</table>";
      return content;
    }
  }

  $scope.getNumber = function (num) {
    if (parseInt(num) > 0) {
      return new Array(parseInt(num));
    }
    return [];
  }

  $scope.showPostSolution = function (row) {
    $("#modalSolution").modal();
    angular.element("#solution-area input").val("");
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
  }

  $scope.saveSolution = function () {
    var content = [];
    if ($scope.solution.type == 1 || $scope.solution.type == 2 || $scope.solution.type == 3) {/*CONG - TRU - NHAN*/
      content = getSolutionData("#type1type2type3 .solution");
    }

    if ($scope.solution.type == 4) {/*DINH THUC*/
      var d = angular.element("#solution-area #type4 #mainSolution input").val();
      var numMatrix = $("#solution-area #type4 .solution").length;
      for (var i = 0; i < numMatrix; i++) {
        content.push(getSolutionData("#type4 #solution" + i));
      }
      content.push(parseInt(d));
    }

    if ($scope.solution.type == 5) {/*KRAMER*/
      content = getSolutionData("#type5 .solution");
    }

    if (content.length) {
      var data = {
        content: content,
        problem_id: $scope.selectedRow.id,
        token: $rootScope.userData.token
        // score_id: null
      }
      $http.post("/api/solutions", data)
        .then(function (response) {
          var msg = response.data.success ? $scope.lang.task.solution.save.success : $scope.lang.task.solution.save.fail;
          helper.popup.info({ title: $scope.lang.label.popupInfo, message: msg, close: function () { return; } })
          if (response.data.success) {
            $("#modalSolution").modal('hide');
            init();
          }
        });
    }
  }

  $scope.getSolution = function (row) {
    $http.get("/api/solutions/" + row.id, {
      headers: {
        "token": $rootScope.userData.token
      }
    })
      .then(function (response) {
        if (response.data.success && response.data.data) {
          var data = response.data.data;
          var content = "";
          if (row.problem_type.type_index == 1 || row.problem_type.type_index == 2 || row.problem_type.type_index == 3) {
            content = renderMatrix(data.content);
          }
          if (row.problem_type.type_index == 4) {
            for (var i = 0; i < data.content.length - 1; i++) {
              content += ("<p></p><p class='text-center'>" + $scope.lang.label.minusCol + " " + (i + 1) + " " + $scope.lang.label.minusRow + " " + (i + 1) + " " + "</p>")
              content += renderMatrix(data.content[i]);
            }
            content += ("<p></p><p class='text-center header'>d = " + data.content[data.content.length - 1] + "</p>");
          }
          if (row.problem_type.type_index == 5) {
            content = "<table align='center' width='100%'><tr>";
            var equationVariables = ['x', 'y', 'z', 't', 'u', 'v', 'k', 'l', 'm', 'xx', 'yy', 'zz', 'tt', 'uu', 'vv', 'kk', 'll', 'mm'];
            for (var i = 0; i < data.content[0].length; i++) {
              content += ("<td" + (i < data.content[0].length - 1 ? "" : " class='header'") + ">d" + (i < data.content[0].length - 1 ? (i + 1) : "") + " = " + data.content[0][i] + "</td>");
            }
            content += "</tr><tr>"
            for (var i = 0; i < data.content[1].length; i++) {
              content += ("<td>" + equationVariables[i] + " = " + data.content[1][i] + "</td>");
            }
            content += "</tr></table>";
          }
          helper.popup.info({ title: $scope.lang.label.solution, message: content, close: function () { return; } })
        } else {
          helper.popup.info({ title: $scope.lang.label.solution, message: $scope.lang.label.noData, close: function () { return; } })
        }
      });

  }

  function getSolutionData(url) {
    var matrixRows = angular.element("#solution-area " + url + " tr");
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

}
