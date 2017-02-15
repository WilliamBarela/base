(function(){
  'use strict';

  var app = angular.module('lister', [])
  app.controller('dropdownController', dropdownController);

  //Dropdown Controller - provides functions which control the dropdown menu and calculations
  dropdownController.$inject = ['$scope'];
  function dropdownController($scope){
    // A small library of functions for rounding, etc.
    $scope.wjLib = new Object();
    $scope.wjLib.round = function(number, precision){
        var p = precision;
        var rounded = (Math.round( Math.round( Math.pow(10, (2*p+1)) * number) / Math.pow(10, (p+1)) ) / Math.pow(10, p));
        return rounded;
      };


    $scope.listItems =  Object.assign({}, physics)// $scope.setDataObject(physics);
    $scope.itemIndex = undefined;
    $scope.dropdownOptions = undefined;
    $scope.physicalProperty = undefined;
    $scope.message = "Please select one";
    $scope.calcOutput = "Please select a property!";
    //boolean options for ng-show
    $scope.appBool = new Object();
    $scope.appBool.initMessage = true;

    $scope.setMessage = function(itemSelected, index){
      $scope.message = itemSelected;
      $scope.itemIndex = index;
      $scope.physicalProperty = Object.assign({},$scope.listItems[$scope.itemIndex])
      $scope.dropdownOptions = Object.assign({},$scope.physicalProperty.variable);
      $scope.calcOutput = "Please input the variables above and click 'Calculate!' below";
      $scope.appBool.initMessage = false;
    }

    $scope.calculate = function(){
      $scope.calcOutput = $scope.physicalProperty.formula($scope.dropdownOptions);
      if($scope.calcOutput >= 0.0005){
        $scope.calcOutput = $scope.wjLib.round($scope.calcOutput, 3);
      }else if($scope.calcOutput < 0.0005){
        $scope.calcOutput = "Less than 0.0005";
      }
    }
  }

  // Javascript object which gives data to controller. JSON object would be used instead if it were supported by GitHub.
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
                      mass with one Newton of force over a distance of 1 m.",
        formula: function(dropdownOptions){
          var energyVars = dropdownOptions;

          // Although this could be done in a loop, this format is perferred for clarity of the formula.
          var mass = energyVars[0].init;
          var distance = energyVars[1].init;
          var acceleration = energyVars[2].init;

          var energy = mass * acceleration * distance;
          return energy;
        }
      },
      {
        property: {name: "Power", unit: "W"},
        object: {name: "climber"},
        variable: [
            {init: 70, slug: "kilogram(s)", unit: "kg", dimension: "mass"},
            {init: 1000, slug: "meter(s)", unit: "m" , dimension: "distance"},
            {init: 9.8, slug: "meter(s) per second squared", unit: "m/s^2", dimension: "acceleration"},
            {init: 60, slug: "second(s)", unit: "s", dimension: "time"}
          ],
        description: "Power is the rate at which work is done / energy is expended. \
                      One watt of power is the amount of work done to move 1 kg of \
                      mass with one Newton of force over a distance of 1 m per second.",
        formula: function(dropdownOptions){
          var powerVars = dropdownOptions;

          var mass = powerVars[0].init;
          var distance = powerVars[1].init;
          var acceleration = powerVars[2].init;
          var time = powerVars[3].init;

          var power = mass * acceleration * distance * time;
          return power;
        }
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
                      per unit of time (second).",
        formula: function(dropdownOptions){
          var intensityVars = dropdownOptions;

          var energy = intensityVars[0].init;
          var time = intensityVars[1].init;
          var area = intensityVars[2].init;

          var intensity = energy * time * area;
          return intensity;
        }
      }

                    ];
})();
