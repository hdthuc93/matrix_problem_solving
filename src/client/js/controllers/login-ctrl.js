var app = angular.module('matrixSolving')
app.controller('loginCtrl', ['$scope', '$cookieStore', '$http', '$rootScope', '$timeout', '$location', 'helper', loginCtrl]);

function loginCtrl($scope, $cookieStore, $http, $rootScope, $timeout, $location, helper) {
  $scope.emailPattern = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
  function init() {
    $scope.isRegister = false;
    $scope.email = "";
    $scope.password = "";
    $scope.item = {
      first_name: '',
      last_name: '',
      email: '',
      user_type: null,
      password: '',
      rePassword: '',
    };
  }
  init();

  $scope.login = function () {
    if ($scope.loginForm.$error.required && $scope.loginForm.$error.required.length > 0) {
      $scope.loginForm[$scope.loginForm.$error.required[0].$name].$touched = true;
      return false;
    }
    var body = {
      "email": $scope.email || null,
      "password": $scope.password || null
    }
    $http.post('/api/users/login', body).then(function successCallBack(res) {
      if (res.data.success) {
        var data = res.data.data;
        var expireDate = new Date();
        expireDate.setDate(expireDate.getDate() + 7);
        // Setting a cookie
        $rootScope.userData = data;;
        $cookieStore.put(
          'userdata',
          {
            loggedIn: true,
            name: data.name,
            role: data.role,
            token: data.token,
            expire: expireDate
          });
        $location.path('/');
      } else {
        helper.popup.info({ title: $scope.lang.label.popupInfo, message: $scope.lang.login.loginFail , close: function () { return; } });
      }
    }, function errorCallback() {
      helper.popup.info({
        title: $scope.lang.label.errorTitle, message: $scope.lang.label.errorMessage, close: function () {
          location.reload();
          return;
        }
      })
    });
  }

  $scope.logout = function () {
    $cookieStore.put('userdata', {});
    $location.path('/login');
  }
  $scope.register = function () {
    if ($scope.registerForm.$error.required && $scope.registerForm.$error.required.length > 0) {
      $scope.registerForm[$scope.registerForm.$error.required[0].$name].$touched = true;
      return false;
    }
    if (typeof $scope.registerForm.$error.email !== 'undefined' && $scope.registerForm.$error.email.length > 0) {
      $scope.registerForm[$scope.registerForm.$error.email[0].$name].$touched = true;
      return false;
    }

    let param = angular.copy($scope.item);
    param.user_type_id = 3;
    
    $http.post("api/users/register", param).then(function (response) {
      helper.popup.info({ title: $scope.lang.label.info, message: response.data.message, close: function () { return; } });
      if (response.data.success) {
        init();
      };
    });

  }
}



