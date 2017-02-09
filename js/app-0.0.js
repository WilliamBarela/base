(function(){
  'use strict';

  var app = angular.module('lister', [])

  app.controller('menuServer', menuServer);
  app.controller('dropdownController', dropdownController);

  menuServer.$inject = ['$scope'];
  function menuServer($scope){
    $scope.myData = JSON.parse(physics);
    $scope.makeList = function(){
      console.log($scope.myData[0].object.name);
    }
  }

  dropdownController.$inject = ['$scope'];
  function dropdownController($scope){
    $scope.message = "Please select one"
    $scope.properties = ["Energy", "Newton's First Law", "Newton's Second Law"];  //remove from final code here and in html
    $scope.listItems = JSON.parse(physics);
    $scope.units = JSON.parse(physics_units);   //remove from final code here and in html
    $scope.setMessage = function(itemSelected){
      $scope.message = itemSelected;
    }
    $scope.makeList = function(){     //remove from final code here and in final html
      console.log($scope.units);
    }
  }






  var data = '[{"choice": "blue or red", \
                "blue": "forget it all", \
                "red": "open your mind to the matrix"}]';

  var physics = '[ \
                  {"property": "energy", "object": {"name": "bowling ball", "mass": 7.26, "acceleration":9.8, "init-distance":100}, "units": {"mass": "kg", "distance": "m"}, "colors":{"red": "open your mind to the matrix"}}, \
                  {"property": "mass", "object": {"name": "bowling ball", "mass": 7.26, "acceleration":9.8, "init-distance":100}, "units": {"mass": "kg", "distance": "m"}, "colors":{"red": "open your mind to the matrix"}}, \
                  {"property": "force", "object": {"name": "bowling ball", "mass": 7.26, "acceleration":9.8, "init-distance":100}, "units": {"mass": "kg", "distance": "m"}, "colors":{"red": "open your mind to the matrix"}}, \
                  {"property": "acceleration", "object": {"name": "bowling ball", "mass": 7.26, "acceleration":9.8, "init-distance":100}, "units": {"mass": "kg", "distance": "m"}, "colors":{"red": "open your mind to the matrix"}} \
                ]';
  var physics_units = '[ \
                        {"name": "kg"}, \
                        {"name": "m"}, \
                        {"name": "m/s^2"} \
                        ]'

})();
