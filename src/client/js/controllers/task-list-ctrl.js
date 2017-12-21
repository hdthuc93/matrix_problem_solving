var app = angular.module('matrixSolving')
app.controller('taskListCtrl', ['$scope', '$cookieStore', '$http', '$rootScope', '$timeout', '$location', 'helper', taskListCtrl]);

function taskListCtrl($scope, $cookieStore, $http, $rootScope, $timeout, $location, helper) {
  function init() {
    $scope.search = {
    }
    getTaskList();
  }
  init();

  $scope.taskList = {
    minRowsToShow: 15,
    enableSorting: false,
    enableRowSelection: true,
    multiSelect: false,
    enableColumnResizing: true,
    selectionRowHeaderWidth: 35,
    columnDefs: [
      { field: 'no', displayName: 'STT', width: 40 }
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

  function getTaskList() {

  }
}



