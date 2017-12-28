'use-strict'
var app = angular.module("matrixSolving");

app.controller("regulationCtrl", ['$scope', '$rootScope', 'helper', '$location', '$http', regulationCtrl]);
function regulationCtrl($scope, $rootScope, helper, $location, $http) {

    $scope.levelLabel = [$scope.lang.regulation.hardLevel.level1, $scope.lang.regulation.hardLevel.level2, $scope.lang.regulation.hardLevel.level3]

    function init() {
        getHardLevelList();
    }
    init();

    function getHardLevelList() {
        $http.get("/api/problems/constant", {
            headers: {
                "token": $rootScope.userData.token
            }
        }).then(function (response) {
            $scope.hardLevelList = response.data.data;
        });
    }

    $scope.save = function () {
        if ($scope.regulationForm.$error.required && $scope.regulationForm.$error.required.length > 0) {
            $scope.regulationForm[$scope.regulationForm.$error.required[0].$name].$touched = true;
            return false;
        }

        var success = true;

        for (var i = 0; i < $scope.hardLevelList.length; i++) {
            $http.put("/api/constants", {
                id: $scope.hardLevelList[i].id,
                min_size: $scope.hardLevelList[i].min_size,
                max_size: $scope.hardLevelList[i].max_size,
                "token": $rootScope.userData.token
            }).then(function (response) {
                if(!response.data.success){
                    success = false;
                }
            });
        }

        var msg = success?$scope.lang.regulation.save.success:$scope.lang.regulation.save.fail;

        helper.popup.info({ title: $scope.lang.label.popupInfo, message: msg, close: function () { return; } })
        
        
    }
}