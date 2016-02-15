(function() {

  var app = angular.module('senate', []);

  app.controller('TabsCtrl', [ '$http', function($http){

    var store = this;
    store.products = [];
    console.log("hey");
    $http.get('senate.json').success(function(data){
      store.products = data;
      console.log(data);
    });
  }]);
})();
