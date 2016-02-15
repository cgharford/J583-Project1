(function() {

  var app = angular.module('senate', []);

  app.controller('TabsCtrl', [ '$http', function($http){
    // Get this working!!!
    this.changeTab = function(tab){
        console.log(tab);
        if (tab == 1){
            $("tab1").addClass("active-tab");
            $("tab1").removeClass("inactive-tab");
            $("tab2").addClass("inactive-tab");
            $("tab2").removeClass("active-tab");
        }
        else {
            console.log("We should be here");
            $("tab2").addClass("active-tab");
            $("tab2").removeClass("inactive-tab");
            $("tab1").addClass("inactive-tab");
            $("tab1").removeClass("active-tab");
        }
    }
  }]);

  app.controller('TableCtrl', [ '$http', function($http){
    var store = this;
    store.products = [];
    $http.get('/senate.json').success(function(data){
      store.products = data;
      console.log(store.products);
    });
  }]);

  app.controller('Table', [ '$http', function($http) {
    this.seats = [1, 2, 3];
    $http.get('senate.json').success(function(data) {
      this.seats = data;
      console.log(this.seats);
    });

    console.log(this.seats);
  }]);
})();
