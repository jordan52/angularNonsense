'use strict';

// import numpy.random as random
// print(random.normal(100.0,15,10))
//
// [  89.07511089  102.23344158   99.40623555  101.12356061  117.28880854
//    125.3285453    89.50526668   72.32998573   96.34697385  107.97372603]

var clapDelays = [89.07511089, 102.23344158, 99.40623555, 101.12356061, 117.28880854,
    125.3285453, 89.50526668, 72.32998573, 96.34697385, 107.97372603];
var volumes = [0.3223254, 0.75143339, 0.47993786, 0.9172416, 0.58518288, 0.3223254, 0.75143339, 0.47993786, 0.9172416, 0.58518288];

//from https://gist.github.com/manast/1185904
function interval(duration, fn) {
    this.baseline = undefined;

    this.run = function () {
        if (this.baseline === undefined) {
            this.baseline = new Date().getTime();
        }
        fn()
        var end = new Date().getTime();
        this.baseline += duration;

        var nextTick = duration - (end - this.baseline)
        if (nextTick < 0) {
            nextTick = 0;
        }
        (function (i) {
            i.timer = setTimeout(function () {
                i.run(end);
            }, nextTick);
        }(this));
    };

    this.stop = function () {
        clearTimeout(this.timer);
    }
}


angular.module('myApp.claps', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view1', {
            templateUrl: 'claps/claps.html',
            controller: 'ClapsCtrl'
        });
    }])

    //ok, now use ideas from https://github.com/danielstern/ngAudio to finish.
    .controller('ClapsCtrl', ['$scope', function ($scope) {


        $scope.timer = new interval(50, function () {
            console.log(new Date().getTime())
        })

        $scope.claps = [];
        $scope.playing = false;
        for (var i = 0; i < clapDelays.length; i++) {
            $scope.claps[i] = document.createElement('audio');
            $scope.claps[i].src = 'media/clap-hall-01.mp3';
            $scope.claps[i].volume = volumes[i];
        }

        $scope.play = function () {
            for (var i = 0; i < clapDelays.length; i++) {
                (function (_i) {
                    setTimeout(function () {
                        if ($scope.claps[_i]) {
                            $scope.claps[_i].play();
                        }
                    }, clapDelays[_i]);
                })(i);

            }

            $scope.playing = true;
        };
        $scope.stop = function () {

            $scope.playing = false;
        };
        $scope.claps[0].addEventListener('ended', function () {
         console.log("got an ended event");
         $scope.$apply(function () {
            $scope.stop()
         });
         });

    }]);
