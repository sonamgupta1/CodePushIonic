CodePushIonic.controller('geoLocationCtrl', function ($scope,$rootScope) {
    $scope._position = {};
    $scope.getGeoLocation = function () {
        $rootScope.$broadcast('loading:show');
        var posOptions = {timeout: 10000, enableHighAccuracy: false};
        navigator.geolocation.getCurrentPosition(onPositionSuccess, onPositionError, posOptions)

        function onPositionSuccess(position) {
            $scope._position = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            }
            $rootScope.$broadcast('loading:hide')
           
        }

        function onPositionError(error) {

        }
    }

})
