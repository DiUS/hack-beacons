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
        $cordovaBeacon.requestAlwaysAuthorization();

        var region = $cordovaBeacon.createBeaconRegion("dius-beacon", "B9407F30-F5F8-466E-AFF9-25556B57FE6D");

        $rootScope.$on("$cordovaBeacon:didRangeBeaconsInRegion", function(event, pluginResult) {
            $scope.rangeResult = JSON.stringify(pluginResult);
            $scope.$apply();
        });

        $rootScope.$on("$cordovaBeacon:didDetermineStateForRegion", function(event, pluginResult) {
          $scope.stateResult = JSON.stringify(pluginResult);
          $scope.$apply();
        });

        $rootScope.$on("$cordovaBeacon:didStartMonitoringForRegion", function(event, pluginResult) {
            $scope.result = JSON.stringify(pluginResult);
            $scope.$apply();
        });
        $cordovaBeacon.startRangingBeaconsInRegion(region);
        $cordovaBeacon.startMonitoringForRegion(region);

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
