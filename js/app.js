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

    this.setUpCandidatesGrid = function(index) {
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

    this.setUpCandidatesMap = function(indicies) {
        console.log(indicies);
    }

  }]);
})();

changeTab = function(tab){
    if (tab == 1){
        document.getElementById("tab1").style.backgroundColor = "white";
        document.getElementById("tab1").style.border = "solid white";
        document.getElementById("tab2").style.backgroundColor = "#eee";
        document.getElementById("tab2").style.border = "solid #eee";

    }
    else {
        document.getElementById("tab2").style.backgroundColor = "white";
        document.getElementById("tab2").style.border = "solid white";
        document.getElementById("tab1").style.backgroundColor = "#eee";
        document.getElementById("tab1").style.border = "solid #eee";
    }
}

$(document).ready(function() {
    $('#pinBoot').pinterest_grid({
        no_columns: 4,
        padding_x: 10,
        padding_y: 10,
        margin_bottom: 50,
        single_column_breakpoint: 700
    });

    $('#map').usmap({
        stateHoverStyles: {fill: '#ddd'},
        stateSpecificStyles: {
            'AL': {fill: '#990000'},
            'AK': {fill: '#990000'},
            'AZ': {fill: '#990000'},
            'AL': {fill: '#990000'},
            'AR': {fill: '#990000'},
            'CA': {fill: '#004A80'},
            'CO': {fill: '#4d4d4d'},
            'CT': {fill: '#004A80'},
            'DE': {fill: '#004A80'},
            'FL': {fill: '#4d4d4d'},
            'GA': {fill: '#990000'},
            'HI': {fill: '#004A80'},
            'ID': {fill: '#990000'},
            'IL': {fill: '#4d4d4d'},
            'IN': {fill: '#4d4d4d'},
            'IA': {fill: '#004A80'},
            'KS': {fill: '#4d4d4d'},
            'KY': {fill: '#004A80'},
            'LA': {fill: '#004A80'},
            'ME': {fill: '#4d4d4d'},
            'MD': {fill: '#004A80'},
            'MA': {fill: '#004A80'},
            'MI': {fill: '#004A80'},
            'MN': {fill: '#4d4d4d'},
            'MS': {fill: '#990000'},
            'MO': {fill: '#4d4d4d'},
            'MT': {fill: '#4d4d4d'},
            'NE': {fill: '#990000'},
            'NV': {fill: '#4d4d4d'},
            'NH': {fill: '#4d4d4d'},
            'NJ': {fill: '#004A80'},
            'NM': {fill: '#004A80'},
            'NY': {fill: '#004A80'},
            'NC': {fill: '#990000'},
            'ND': {fill: '#4d4d4d'},
            'OH': {fill: '#4d4d4d'},
            'OK': {fill: '#990000'},
            'OR': {fill: '#004A80'},
            'PA': {fill: '#4d4d4d'},
            'RI': {fill: '#004A80'},
            'SC': {fill: '#990000'},
            'SD': {fill: '#990000'},
            'TN': {fill: '#990000'},
            'TX': {fill: '#990000'},
            'UT': {fill: '#990000'},
            'VT': {fill: '#004A80'},
            'VA': {fill: '#004A80'},
            'WA': {fill: '#004A80'},
            'WV': {fill: '#4d4d4d'},
            'WI': {fill: '#4d4d4d'},
            'WY': {fill: '#990000'}
        }
    });
});

$('#map').on('usmapclick', function(event, data) {
  // Output the abbreviation of the state name to the console
  console.log(data.name);

  var scope = angular.element(document.getElementById('TableCtrl')).scope();

  scope.$apply(function () {
        scope.setColor("yo");
  });
});


$( window ).resize(function() {
    $('#pinBoot').pinterest_grid({
        no_columns: 4,
        padding_x: 10,
        padding_y: 10,
        margin_bottom: 50,
        single_column_breakpoint: 700
    });
});

;(function ($, window, document, undefined) {
    var pluginName = 'pinterest_grid',
        defaults = {
            padding_x: 10,
            padding_y: 10,
            no_columns: 3,
            margin_bottom: 50,
            single_column_breakpoint: 700
        },
        columns,
        $article,
        article_width;

    function Plugin(element, options) {
        this.element = element;
        this.options = $.extend({}, defaults, options) ;
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    Plugin.prototype.init = function () {
        var self = this,
            resize_finish;

        $(window).resize(function() {
            clearTimeout(resize_finish);
            resize_finish = setTimeout( function () {
                self.make_layout_change(self);
            }, 11);
        });

        self.make_layout_change(self);

        setTimeout(function() {
            $(window).resize();
        }, 500);
    };

    Plugin.prototype.calculate = function (single_column_mode) {
        var self = this,
            tallest = 0,
            row = 0,
            $container = $(this.element),
            container_width = $container.width();
            $article = $(this.element).children();

        if(single_column_mode === true) {
            article_width = $container.width() - self.options.padding_x;
        } else {
            article_width = ($container.width() - self.options.padding_x * self.options.no_columns) / self.options.no_columns;
        }

        $article.each(function() {
            $(this).css('width', article_width);
        });

        columns = self.options.no_columns;

        $article.each(function(index) {
            var current_column,
                left_out = 0,
                top = 0,
                $this = $(this),
                prevAll = $this.prevAll(),
                tallest = 0;

            if(single_column_mode === false) {
                current_column = (index % columns);
            } else {
                current_column = 0;
            }

            for(var t = 0; t < columns; t++) {
                $this.removeClass('c'+t);
            }

            if(index % columns === 0) {
                row++;
            }

            $this.addClass('c' + current_column);
            $this.addClass('r' + row);

            prevAll.each(function(index) {
                if($(this).hasClass('c' + current_column)) {
                    top += $(this).outerHeight() + self.options.padding_y;
                }
            });

            if(single_column_mode === true) {
                left_out = 0;
            } else {
                left_out = (index % columns) * (article_width + self.options.padding_x);
            }

            $this.css({
                'left': left_out,
                'top' : top
            });
        });

        this.tallest($container);
        $(window).resize();
    };

    Plugin.prototype.tallest = function (_container) {
        var column_heights = [],
            largest = 0;

        for(var z = 0; z < columns; z++) {
            var temp_height = 0;
            _container.find('.c'+z).each(function() {
                temp_height += $(this).outerHeight();
            });
            column_heights[z] = temp_height;
        }

        largest = Math.max.apply(Math, column_heights);
        _container.css('height', largest + (this.options.padding_y + this.options.margin_bottom));
    };

    Plugin.prototype.make_layout_change = function (_self) {
        if($(window).width() < _self.options.single_column_breakpoint) {
            _self.calculate(true);
        } else {
            _self.calculate(false);
        }
    };

    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName,
                new Plugin(this, options));
            }
        });
    }

})(jQuery, window, document);
