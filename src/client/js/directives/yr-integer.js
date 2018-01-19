var app = angular.module("matrixSolving");
app.directive('yrInteger', yrInteger);
function yrInteger() {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {

      element.on('keypress', function (event) {
        if (!isIntegerChar())
          event.preventDefault();
        console.log("aa",(String.fromCharCode(event.which).match(/-/g) || []).length )
        if ((String.fromCharCode(event.which).match(/-/g) || []).length > 1||(String.fromCharCode(event.which).match(/\./g) || []).length > 1)
          event.preventDefault();

        function isIntegerChar() {
          return /[0-9]|-|\./.test(
            String.fromCharCode(event.which))
        }
      })

    }
  }
}