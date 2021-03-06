// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var CodePushIonic = angular.module('starter', ['ionic', 'ngCordova'])

CodePushIonic.run(function ($ionicPlatform, $ionicLoading, $rootScope, $cordovaDialogs, $cordovaToast) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
        var onError = function (error) {
            $rootScope.$broadcast('loading:hide');
            $cordovaToast.show('An error occurred. ', 'long', 'center');
        };

        var onApplySuccess = function () {
            $rootScope.$broadcast('loading:hide');
            $cordovaToast.show('Apply succeeded. Reloading the application...', 'long', 'center');
        };

        var onPackageDownloaded = function (localPackage) {
            $rootScope.$broadcast('loading:show');
            localPackage.apply(onApplySuccess, onError);
        };

        var onUpdateCheck = function (remotePackage) {

            $rootScope.$broadcast('loading:show');
            if (!remotePackage) {
                $rootScope.$broadcast('loading:hide');

                $cordovaToast.show('The application is up to date.', 'long', 'center');

            } else {
                $cordovaDialogs.confirm('Update available.Do you want to update?', 'Update', ['Ok', 'Cancel'])
                    .then(function (buttonIndex) {
                        if (buttonIndex == '1') {

                            $rootScope.$broadcast('loading:show');
                            remotePackage.download(onPackageDownloaded, onError);
                        }
                        else {

                            $rootScope.$broadcast('loading:hide');

                        }
                    });

            }
        };

        window.codePush.checkForUpdate(onUpdateCheck, onError);

        $rootScope.$on('loading:show', function () {
            $ionicLoading.show({
                template: '<p class="center">' +
                    '<ion-spinner icon="android"/>' +
                    '<div>Loading...</div>' +
                    '</p>'
            })
        });

        $rootScope.$on('loading:hide', function () {
            $ionicLoading.hide()
        })
    });
})
