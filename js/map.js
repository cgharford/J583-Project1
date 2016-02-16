$('#map').on('usmapclick', function(event, data) {
  // Output the abbreviation of the state name to the console
  console.log(data.name);

  var scope = angular.element(document.getElementById('TableCtrl')).scope();

  scope.$apply(function () {
        scope.setColor("yo");
  });
});
