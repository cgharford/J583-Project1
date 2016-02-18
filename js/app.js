var senators = [];

(function() {

  var app = angular.module('senate', []);

  app.controller('SenateCtrl', [ '$scope', '$http', function($scope, $http){
    var store = this;
    this.sortReverse  = false;
    store.products = [];

    $scope.showTab1 = false;

    // Get external json file via ajax
    $http.get('/senate.json').success(function(data){
      store.products = data;
      senators = data;
    });

    this.show = function(index){
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
          senators = items;
    };
    this.setUpCandidatesGrid = function(index) {
        formatCandidateInfo([index]);
    };

    this.changeTab = function(tab){
        if (tab == 1){
            document.getElementById("tab1").style.backgroundColor = "white";
            document.getElementById("tab1").style.border = "solid white";
            document.getElementById("tab2").style.backgroundColor = "#eee";
            document.getElementById("tab2").style.border = "solid #eee";
            $scope.showTab1 = false;
        }
        else {
            document.getElementById("tab2").style.backgroundColor = "white";
            document.getElementById("tab2").style.border = "solid white";
            document.getElementById("tab1").style.backgroundColor = "#eee";
            document.getElementById("tab1").style.border = "solid #eee";
            $scope.showTab1 = true;
        }

        $("#candidates").text("");
    }
  }]);
})();

formatCandidateInfo = function(indexArr) {
    html = ""
    html += '<section id="pinBoot">';
    $.each(indexArr, function(i, index){
        html += createCandidates(index);
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
}

createCandidates = function(index) {
    html = "";
    element = senators[index];

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
    return html;
}

$(document).ready(function() {
    resizeCandidates();
    createMap();
});

$(window).resize(function() {
    resizeCandidates();
});

resizeCandidates = function() {
    $('#pinBoot').pinterest_grid({
        no_columns: 4,
        padding_x: 10,
        padding_y: 10,
        margin_bottom: 50,
        single_column_breakpoint: 700
    });
}

createMap = function() {
    jQuery('#vmap').vectorMap({
          map: 'usa_en',
          backgroundColor: 'white',
          showTooltip: true,
          enableZoom: false,
          hoverColor: '#ddd',
          colors: {
            al: '#990000',
            ak: '#990000',
            az: '#990000',
            ar: '#990000',
            ca: '#004A80',
            co: '#4d4d4d',
            ct: '#004A80',
            de: '#004A80',
            fl: '#4d4d4d',
            ga: '#990000',
            hi: '#004A80',
            id: '#990000',
            il: '#4d4d4d',
            in: '#4d4d4d',
            ia: '#004A80',
            ks: '#4d4d4d',
            ky: '#004A80',
            la: '#004A80',
            me: '#4d4d4d',
            md: '#004A80',
            ma: '#004A80',
            mi: '#004A80',
            mn: '#4d4d4d',
            ms: '#990000',
            mo: '#4d4d4d',
            mt: '#4d4d4d',
            ne: '#990000',
            nv: '#4d4d4d',
            nh: '#4d4d4d',
            nj: '#004A80',
            nm: '#004A80',
            ny: '#004A80',
            nc: '#990000',
            nd: '#4d4d4d',
            oh: '#4d4d4d',
            ok: '#990000',
            or: '#004A80',
            pa: '#4d4d4d',
            ri: '#004A80',
            sc: '#990000',
            sd: '#990000',
            tn: '#990000',
            tx: '#990000',
            ut: '#990000',
            vt: '#004A80',
            va: '#004A80',
            wa: '#004A80',
            wv: '#4d4d4d',
            wi: '#4d4d4d',
            wy: '#990000'
          },
          onRegionClick: function(event, code, region){
            event.preventDefault();
            state = code.toUpperCase();

            indexArr = [];
            switch(state) {
                case "AL":
                    indexArr = [0, 1];
                    break;
                case "AK":
                    indexArr = [2, 3];
                    break;
                case "AZ":
                    indexArr = [4, 5];
                    break;
                case "AR":
                    indexArr = [6, 7];
                    break;
                case "CA":
                    indexArr = [8, 9];
                    break;
                case "CO":
                    indexArr = [10, 11];
                    break;
                case "CT":
                    indexArr = [12, 13];
                    break;
                case "DE":
                    indexArr = [14, 15];
                    break;
                case "FL":
                    indexArr = [16, 17];
                    break;
                case "GA":
                    indexArr = [18, 19];
                    break;
                case "HI":
                    indexArr = [20, 21];
                    break;
                case "ID":
                    indexArr = [22, 23];
                    break;
                case "IL":
                    indexArr = [24, 25];
                    break;
                case "IN":
                    indexArr = [26, 27];
                    break;
                case "IA":
                    indexArr = [28, 29];
                    break;
                case "KS":
                    indexArr = [30, 31];
                    break;
                case "KY":
                    indexArr = [32, 33];
                    break;
                case "LA":
                    indexArr = [34, 35];
                    break;
                case "ME":
                    indexArr = [36, 37];
                    break;
                case "MD":
                    indexArr = [38, 39];
                    break;
                case "MA":
                    indexArr = [40, 41];
                    break;
                case "MI":
                    indexArr = [42, 43];
                    break;
                case "MN":
                    indexArr = [44, 45];
                    break;
                case "MS":
                    indexArr = [46, 47];
                    break;
                case "MO":
                    indexArr = [48, 49];
                    break;
                case "MT":
                    indexArr = [50, 51];
                    break;
                case "NE":
                    indexArr = [52, 53];
                    break;
                case "NV":
                    indexArr = [54, 55];
                    break;
                case "NH":
                    indexArr = [56, 57];
                    break;
                case "NJ":
                    indexArr = [58, 59];
                    break;
                case "NM":
                    indexArr = [60, 61];
                    break;
                case "NY":
                    indexArr = [62, 63];
                    break;
                case "NC":
                    indexArr = [64, 65];
                    break;
                case "ND":
                    indexArr = [66, 67];
                    break;
                case "OH":
                    indexArr = [68, 69];
                    break;
                case "OK":
                    indexArr = [70, 71];
                    break;
                case "OR":
                    indexArr = [72, 73];
                    break;
                case "PA":
                    indexArr = [74, 75];
                    break;
                case "RI":
                    indexArr = [76, 77];
                    break;
                case "SC":
                    indexArr = [78, 79];
                    break;
                case "SD":
                    indexArr = [80, 81];
                    break;
                case "TN":
                    indexArr = [82, 83];
                    break;
                case "TX":
                    indexArr = [84, 85];
                    break;
                case "UT":
                    indexArr = [86, 87];
                    break;
                case "VT":
                    indexArr = [88, 89];
                    break;
                case "VA":
                    indexArr = [90, 91];
                    break;
                case "WA":
                    indexArr = [92, 93];
                    break;
                case "WV":
                    indexArr = [94, 95];
                    break;
                case "WI":
                    indexArr = [96, 97];
                    break;
                case "WY":
                    indexArr = [98, 99];
                    break;
            }
            formatCandidateInfo(indexArr);
          }
    });
}

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
