(function(){
  'use strict';

  var wjLib = {
    // A function to round numbers to a certain precision
    round: function(number, precision){
      var p = precision;
      var rounded = (Math.round( Math.round( Math.pow(10, (2*p+1)) * number) / Math.pow(10, (p+1)) ) / Math.pow(10, p));
      return rounded;
    }
  };

  var app = angular.module('lister', [])
  app.controller('dropdownController', dropdownController);

  //Dropdown Controller - provides functions which control the dropdown menu and calculations
  dropdownController.$inject = ['$scope'];
  function dropdownController($scope){
    $scope.listItems =  Object.assign({}, physics)// $scope.setDataObject(physics);
    $scope.itemIndex = undefined;
    $scope.dropdownOptions = undefined;
    $scope.physicalProperty = undefined;
    $scope.calcOutputUnits = undefined;
    $scope.message = "Please select one";
    $scope.calcOutput = "Please select a property!";
    $scope.analysisMessage = "";

    //boolean options for ng-show:
    $scope.appBool = {};
    $scope.appBool.initMessage = true;
    $scope.appBool.afterCalcMessage = false;
    $scope.appBool.tryCalcAgain = false;
    $scope.appBool.errorMessage = false;

    $scope.selectProperty = function(itemSelected, index){
      $scope.message = itemSelected;
      $scope.itemIndex = index;
      $scope.physicalProperty = Object.assign({},$scope.listItems[$scope.itemIndex])
      $scope.dropdownOptions = Object.assign({},$scope.physicalProperty.variable);
      $scope.calcOutput = "Please input the variables above and click 'Calculate!' below";
      $scope.appBool.initMessage = false; 
      $scope.appBool.tryCalcAgain = true;
      $scope.appBool.afterCalcMessage = false;
    }

    $scope.calculate = function(){
      $scope.appBool.errorMessage = false;
      $scope.calcOutputUnits = $scope.physicalProperty.property.unit;
      $scope.calcOutput = $scope.physicalProperty.formula($scope.dropdownOptions, $scope.itemIndex);
      // FIXME: Better error handling should be applied to the date before it gets here so that this set of loops is not necessary.
      if($scope.calcOutput == Infinity){
        $scope.appBool.errorMessage = true;
        $scope.calcOutput = "Hold on there!! You know the rules, right? Nature doesn't cut nicely with 0's Please avoid dividing with them or multiplying by Infinity :)";
      }else if($scope.calcOutput >= 0.0005){
        $scope.calcOutput = wjLib.round($scope.calcOutput, 3);
      }else if($scope.calcOutput > 0 && $scope.calcOutput < 0.0005){
        $scope.calcOutput = "less than 0.0005";
      }else if($scope.calcOutput === 0){
        $scope.calcOutput = 0;
      }else{
        $scope.appBool.errorMessage = true;
        $scope.calcOutput = "Whoa, wait a minute...something is fishy here. Did you try to make time flow backwards or make a negative mass??? \
                            Please try again, but this time without breaking the laws of physics :) ...Also, please only use numbers (e.g., 25, 1.3, etc.)";
      }
      $scope.appBool.afterCalcMessage = true;
      $scope.appBool.tryCalcAgain = false;
      $scope.analysisMessage = $scope.physicalProperty.analysis($scope.dropdownOptions, $scope.itemIndex, $scope.calcOutput);
    }
    /*
    $scope.setAnalysisMessage = function(){
      (dropdownOptions, itemIndex, calcOutput)
    }
    */
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
        inputVars: function(dropdownOptions){
          var mass = dropdownOptions[0].init;
          var distance = dropdownOptions[1].init;
          var acceleration = dropdownOptions[2].init;

          return {
            mass: mass,
            distance: distance,
            acceleration: acceleration
          }
        },
        formula: function(dropdownOptions,itemIndex){
          var qty = physics[itemIndex].inputVars(dropdownOptions);

          var energy = qty.mass * qty.acceleration * qty.distance;
          return energy;
        },
        analysis: function(dropdownOptions, itemIndex, calcOutput){
          var qty = physics[itemIndex].inputVars(dropdownOptions);
          // Can be improved by expanding inputVars to return units as well so that it is more general
          var message = "It requires " + calcOutput + " J of energy for an object of " + qty.mass + " kg of mass to be accelerated at " + qty.acceleration + " m/s^2 over a distance of " + qty.distance + " m.";
          return message;
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
        inputVars: function(dropdownOptions){
          var mass = dropdownOptions[0].init;
          var distance = dropdownOptions[1].init;
          var acceleration = dropdownOptions[2].init;
          var time = dropdownOptions[3].init;

          return {
            mass: mass,
            distance: distance,
            acceleration: acceleration,
            time: time
          }
        },
        formula: function(dropdownOptions,itemIndex){
          var qty = physics[itemIndex].inputVars(dropdownOptions);

          var power = (qty.mass * qty.acceleration * qty.distance) / qty.time;
          return power;
        },
        analysis: function(dropdownOptions, itemIndex, calcOutput){
          var qty = physics[itemIndex].inputVars(dropdownOptions);
          // Can be improved by expanding inputVars to return units as well so that it is more general
          var message = calcOutput + " W of power must be supplied for an object of " +
                        qty.mass + " kg of mass to be accelerated at " + qty.acceleration + " m/s^2 over a distance of " +
                        qty.distance + " m in the course of " + qty.time + " s.";
          return message;
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
        },
        inputVars: function(dropdownOptions){
          var energy = dropdownOptions[0].init;
          var time = dropdownOptions[1].init;
          var area = dropdownOptions[2].init;

          return {
            energy: energy,
            time: time,
            area: area
          }
        },
        formula: function(dropdownOptions,itemIndex){
          var qty = physics[itemIndex].inputVars(dropdownOptions);

          var intensity = qty.energy / (qty.time * qty.area);
          return intensity;
        },
        analysis: function(dropdownOptions, itemIndex, calcOutput){
          var qty = physics[itemIndex].inputVars(dropdownOptions);
          // Can be improved by expanding inputVars to return units as well so that it is more general
          var message = "When " + qty.energy + " J of energy is applied to an area of " +
                        qty.area + " m in the span of " + qty.time + " s, the amount of work \
                        that would be done on one meter of the surface per second would be " +
                        calcOutput + " J*m^-2*s^-1.";
          return message;
        }
      }

                    ];
})();
