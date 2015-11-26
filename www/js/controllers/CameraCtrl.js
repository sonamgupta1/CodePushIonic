CodePushIonic.controller("CameraCtrl", function($scope, $cordovaCamera) {

    $scope.takePicture = function() {
        var options = {
            quality : 75,
            destinationType : Camera.DestinationType.DATA_URL,
            sourceType : Camera.PictureSourceType.CAMERA,
            allowEdit : true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 300,
            targetHeight: 300,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };
        $scope.images = [];

        $cordovaCamera.getPicture(options).then(function(imageData) {

            $scope.imgURI = "data:image/jpeg;base64," + imageData;

            $scope.images.push($scope.imgURI);

            console.log("length",$scope.images.length);


        }, function(err) {
            // An error occured. Show a message to the user
        });
    }

});