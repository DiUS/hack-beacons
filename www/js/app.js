// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngCordovaBeacon', 'firebase'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      if(window.cordova && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if(window.StatusBar) {
          StatusBar.styleDefault();
      }
  });
})

.controller("MainController", function($scope, $rootScope, $ionicPlatform, $cordovaBeacon, Items) {

    $scope.beacons = {};

    // $scope.firebaseData = Items;

    Items.$bindTo($scope, "data");


    $ionicPlatform.ready(function() {

        $cordovaBeacon.requestWhenInUseAuthorization();

        $rootScope.$on("$cordovaBeacon:didRangeBeaconsInRegion", function(event, pluginResult) {
          console.log('AAAAAAAAAA');
            var uniqueBeaconKey;
            for(var i = 0; i < pluginResult.beacons.length; i++) {
                uniqueBeaconKey = pluginResult.beacons[i].uuid + ":" + pluginResult.beacons[i].major + ":" + pluginResult.beacons[i].minor;
                $scope.beacons[uniqueBeaconKey] = pluginResult.beacons[i];
            }
            $scope.$apply();
        });

        $cordovaBeacon.startRangingBeaconsInRegion($cordovaBeacon.createBeaconRegion("dius-beacon", "B9407F30-F5F8-466E-AFF9-25556B57FE6D"));

    });

    $scope.addValue = function() {
      $scope.data[$scope.key] = $scope.value
    }
})

.factory("Items", function($firebaseObject) {
    var itemsRef = new Firebase("https://hack-beacons.firebaseio.com");
    console.log("Items Array: ", itemsRef);
    return $firebaseObject(itemsRef);
});
