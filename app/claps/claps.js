'use strict';

angular.module('myApp.claps', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view1', {
            templateUrl: 'claps/claps.html',
            controller: 'ClapsCtrl'
        });
    }])

    //ok, now use ideas from https://github.com/danielstern/ngAudio to finish.
    .controller('ClapsCtrl', ['$scope', function ($scope) {
        $scope.playing = false;
        $scope.clap1 = document.createElement('audio');
        $scope.clap1.src = 'media/clap-hall-01.mp3';
        $scope.clap2 = document.createElement('audio');
        $scope.clap2.src = 'media/clap-hall-01.mp3';
        $scope.play = function () {
            setTimeout(function(){$scope.clap1.play()},10);
            setTimeout(function(){$scope.clap2.play()},20);
            $scope.playing = true;
        };
        $scope.stop = function () {
            $scope.clap1.pause();
            $scope.playing = false;
        };
        $scope.clap1.addEventListener('ended', function () {
            console.log("got an ended event");
            $scope.$apply(function () {
                $scope.stop()
            });
        });

    }]);
