(function(){
  'use strict';

  angular.module('lister', []).controller('menuServer', menuServer);

  menuServer.$inject = ['$scope', '$http'];
  function menuServer($scope, $http){
    $http.get('../data/physics.json').then(function(response){
      $scope.myData = response.data;
    })
    $scope.makeList = function(){
      console.log($scope.myData);
    }
  }


})();

// Convert a Javascript object to JSON in angular:

/*
  console.log(angular.toJson($scope.myData))
*/
