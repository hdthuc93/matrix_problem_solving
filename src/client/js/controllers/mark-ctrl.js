'use-strict'
var app = angular.module("matrixSolving");

app.controller("markCtrl", ['$scope', '$rootScope', 'helper', '$location', '$http', markCtrl]);
function markCtrl($scope, $rootScope, helper, $location, $http) {
    function init() {
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
            { field: 'no', displayName: $scope.lang.task.list.grid.no, width: 40 },
            { field: 'no', displayName: $scope.lang.task.list.grid.matrix1, minWidth: 100 },
            { field: 'no', displayName: $scope.lang.task.list.grid.matrix2, minWidth: 100 },
            { field: 'no', displayName: $scope.lang.task.list.grid.type, minWidth: 100 },
            { field: 'no', displayName: $scope.lang.task.list.grid.level, minWidth: 100 }
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