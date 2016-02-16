(function() {

  var app = angular.module('senate', []);

  app.controller('TableCtrl', [ '$http', function($http){
    var store = this;
    this.sortReverse  = false;
    store.products = [];
    $http.get('/senate.json').success(function(data){
      store.products = data;
    });

    this.setColor = function(party) {
        console.log(party);
    }

    this.show = function(index){
        console.log($("child" + index));
        console.log(document.getElementById("child" + index).style.display);
        document.getElementById("child" + index).style.display = "block";
        $("child" + index).show();
    }

    this.sort = function(title) {
        items = store.products;
        this.sortReverse = !this.sortReverse;

        var length = items.length;
          for (var i = 0; i < length; i++) {
            for (var j = 0; j < (length - i - 1); j++) {
              if (this.sortReverse) {
                  if(items[j][title] > items[j+1][title]) {
                    var tmp = items[j];
                    items[j] = items[j+1];
                    items[j+1] = tmp;
                  }
              }
              else {
                  if(items[j][title] < items[j+1][title]) {
                    var tmp = items[j];
                    items[j] = items[j+1];
                    items[j+1] = tmp;
                  }
              }
            }
          }

        this.players = items;
    };

    this.setUpCandidates = function(index) {
        html = ""
        element = store.products[index];

        html += '<section id="pinBoot">';

        // First make a box for the senator himself
        if (element.contested == "False") {
            html += '<article class="white-panel">';
            if (element.party == "Republican") {
                html += '<div class="rep-border">';
            }
            else {
                html += '<div class="dem-border">';
            }
            if (element.image != null) {
                html += '<img class="candidate-img" src="' + element.image + '">'
            }
            html += '<div class="name">' + element.currentSenator + '</div>';
            html += '<div class="party">' + element.party + ' Senator</div>';
            html += '</div>';
            html += '</article>';
        }

        // Next iterate through the candidates
        $.each(element.candidates, function(i, data){
            html += '<article class="white-panel">';
            if (data.party == "Republican") {
                html += '<div class="rep-border">';
            }
            else {
                html += '<div class="dem-border">';
            }
            if (data.image != null) {
                html += '<img class="candidate-img" src="' + data.image + '">'
            }
            html += '<div class="name">' + data.name + '</div>';
            html += '<div class="party">' + data.party + ' Candidate</div>';
            if (data.bio != null) {
                html += '<div class="bio">' + data.bio + '</div>';
            }
            if (data.platformPoints != null) {
                $.each(data.platformPoints, function(j, points){
                    $.each(points, function(k, point){
                        html += '<li class="platform-points">'+ point + '</li>';
                    })
                })
            }
            if (data.sources != null) {
                html += '<br>';
                $.each(data.sources, function(j, sources){
                    var counter = "I";
                    $.each(sources, function(k, source){
                        html += '<a class="sources" href="'+ source + '">Source '+ counter +'</a>';
                        html += '<br>';
                        counter+="I";
                    })
                })
            }
            html += '</div>';
            html += '</article>';
        })
        html += "</section>"

        $("#candidates").text("");
        $("#candidates").append(html);

        $('#pinBoot').pinterest_grid({
           no_columns: 4,
           padding_x: 10,
           padding_y: 10,
           margin_bottom: 50,
           single_column_breakpoint: 700
       });

    };

  }]);
})();
