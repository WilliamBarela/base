(function(){
  'use strict';

  angular.module('lister', []).controller('menuServer', menuServer);

  menuServer.$inject = ['$scope', '$http'];
  function menuServer($scope, $http){
    //the $http service can only be used if site has a server.
    //Github only allows static sites.
    //Until site is hosted outside of Github, will store app data in app.js
    /* Attempted:
      import * from '../data/physics.js';
      myData = JSON.parse(data);

      However, import is currently unsupported by most browsers.
      Could be used on an emulator like Babbel.
    */
    $http.get('../data/physics.json').then(function(response){
      $scope.myData = response.data;
    })
    $scope.makeList = function(){
      console.log($scope.myData);
    }
  }


})();

// Convert a Javascript object to JSON in angular:
// data must be from a JSON file not a "JSON-like" object.
// For a "JSON-like" object use JSON.parse() function

/*
  console.log(angular.toJson($scope.myData))
*/
