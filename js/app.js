(function(){
  'use strict';

  var app = angular.module('lister', [])

  app.controller('menuServer', menuServer);
  app.controller('dropdownController', dropdownController);

  //Menu Server Function
  menuServer.$inject = ['$scope'];
  function menuServer($scope){
    $scope.myData = JSON.parse(physics_units);
    $scope.makeList = function(){
      console.log($scope.myData[0].object.name);
    }
  }

  //Dropdown Controller
  dropdownController.$inject = ['$scope'];
  function dropdownController($scope){
    $scope.listItems =  physics;
    $scope.message = "Please select one";
    $scope.itemIndex;
    $scope.dropdownOptions;
    $scope.units = JSON.parse(physics_units);   //remove from final code here and in html

    $scope.setMessage = function(itemSelected, index){
      $scope.message = itemSelected;
      $scope.itemIndex = index;
      $scope.dropdownOptions = $scope.listItems[$scope.itemIndex].variable;
    }

    $scope.makeList = function(){     //remove from final code here and in final html
      console.log($scope.units);
    }
  }

  var physics1 = '[ \
                  {"property": "energy", "object": {"name": "bowling ball", "mass": 7.26, "acceleration":9.8, "init-distance":100}, "units": {"mass": "kg", "distance": "m"}, "colors":{"red": "open your mind to the matrix"}}, \
                  {"property": "mass", "object": {"name": "bowling ball", "mass": 7.26, "acceleration":9.8, "init-distance":100}, "units": {"mass": "kg", "distance": "m"}, "colors":{"red": "open your mind to the matrix"}}, \
                  {"property": "force", "object": {"name": "bowling ball", "mass": 7.26, "acceleration":9.8, "init-distance":100}, "units": {"mass": "kg", "distance": "m"}, "colors":{"red": "open your mind to the matrix"}}, \
                  {"property": "acceleration", "object": {"name": "bowling ball", "mass": 7.26, "acceleration":9.8, "init-distance":100}, "units": {"mass": "kg", "distance": "m"}, "colors":{"red": "open your mind to the matrix"}} \
                ]';

  var physics = [
      {
        property: {name: "Energy", unit: "J"},
        object: {name: "bowling ball"},
        variable: [
            {init: 7.26, slug: "kilogram(s)", unit: "kg", dimension: "mass"},
            {init: 100, slug: "meter(s)", unit: "m" , dimension: "distance"},
            {init: 9.8, slug: "meter(s) per second squared", unit: "m/s^2", dimension: "acceleration"}
          ],
        description: "Energy and work are synonymous. One joule of energy is \
                      the amount of work that needs to be done to move 1 kg of \
                      mass with one Newton of force over a distance of 1 m."
      },
      {
        property: {name: "Power", unit: "W"},
        object: {name: "climber"},
        variable: [
            {init: 70, slug: "kilogram(s)", unit: "kg", dimension: "mass"},
            {init: 1000, slug: "meter(s)", unit: "m" , dimension: "distance"},
            {init: 9.8, slug: "meter(s) per second squared", unit: "m/s^2", dimension: "acceleration"},
            {init: 60, slug: "second(s)", unit: "s", dimention: "time"}
          ],
        description: "Power is the rate at which work is done / energy is expended. \
                      One watt of power is the amount of work done to move 1 kg of \
                      mass with one Newton of force over a distance of 1 m per second."
      },
      {
        property: {name: "Intensity", unit: "W/m^2"},
        object: {name: "laser"},
        variable: [
            {init: 0.005, slug: "joule(s)", unit: "J", dimension: "energy"},
            {init: 1, slug: "second(s)", unit: "s", dimension: "time"},
            {init: 0.0001, slug: "meter(s)", unit: "m^s" , dimension: "area"}
          ],
        description: "Intensity is a measure of the amount of work done on a unit \
                      of area per unit time. That is, intensity is measured as the \
                      amount of joules of energy which acts on one unit of area (meter squared) \
                      per unit of time (second)."
      }

                    ];


      var physics_units = '[ \
                            {"name": "kg"}, \
                            {"name": "m"}, \
                            {"name": "m/s^2"} \
                          ]';

      /*$scope.properties = ["Energy", "Newton's First Law", "Newton's Second Law"];  //remove from final code here and in html */

})();
