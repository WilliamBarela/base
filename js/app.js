(function(){
  'use strict';

  angular.module('lister', []).controller('menuServer', menuServer);

  menuServer.$inject = ['$scope'];
  function menuServer($scope){
    $scope.myData = JSON.parse(physics);
    $scope.makeList = function(){
      console.log($scope.myData[0].object.name);
    }
  }

  var data = '[{"choice": "blue or red", \
                "blue": "forget it all", \
                "red": "open your mind to the matrix"}]';

  var physics = '[ \
                  {"property": "energy", "object": {"name": "bowling ball", "mass": 7.26, "acceleration":9.8, "init-distance":100}, "units": {"mass": "kg", "distance": "m"}, "colors":{"red": "open your mind to the matrix"}}, \
                  {"property": "energy", "object": {"name": "bowling ball", "mass": 7.26, "acceleration":9.8, "init-distance":100}, "units": {"mass": "kg", "distance": "m"}, "colors":{"red": "open your mind to the matrix"}}, \
                  {"property": "energy", "object": {"name": "bowling ball", "mass": 7.26, "acceleration":9.8, "init-distance":100}, "units": {"mass": "kg", "distance": "m"}, "colors":{"red": "open your mind to the matrix"}}, \
                  {"property": "energy", "object": {"name": "bowling ball", "mass": 7.26, "acceleration":9.8, "init-distance":100}, "units": {"mass": "kg", "distance": "m"}, "colors":{"red": "open your mind to the matrix"}} \
                ]';

/*
  var physics = '[{"property": "energy", \
                  "object": {"name": "bowling ball", "mass": 7.26, "acceleration":9.8, "init-distance":100}, \
                  "units": {"mass": "kg", "distance": "m"}, \
                  {"red": "open your mind to the matrix"}]';
*/


/*
  var physics = '[{"property": "energy", "object": {"name": "bowling ball", "mass": 7.26, "acceleration":9.8, "init-distance":100}}, \
                {"units": {"mass": "kg", "distance": "m"}},  \
                {"red": "open your mind to the matrix"}]';
*/

/*
  var physics = '[{"property": "energy", "object": {"name": "bowling ball", "mass": "7.26", "acceleration":"9.8", "init-distance":"100"}}, \
                "units": {"mass": "kg","distance": "m"},  \
                "headline": "How much energy (work) does it take to lift a bowling ball 100 meters?", \
                {"red": "open your mind to the matrix"}]';
*/




})();
