(function(){
  'use strict';

  angular.module('lister', []).controller('menuServer', menuServer);

  menuServer.$inject = ['$scope'];
  function menuServer($scope){
    $scope.myData = JSON.parse(data);
    $scope.makeList = function(){
      console.log($scope.myData[0].red);
    }
  }

  var data = '[{"choice": "blue or red", "blue": "forget it all", "red": "open your mind to the matrix"}]';



})();

// Convert a Javascript object to JSON in angular:

/*
  console.log(angular.toJson($scope.myData))
*/
