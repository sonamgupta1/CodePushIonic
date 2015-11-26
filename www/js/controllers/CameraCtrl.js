CodePushIonic.controller("CameraCtrl", function($scope, $cordovaCamera) {

    $scope.images = [];

    $scope.limitPicture = function(){

        if($scope.images.length<5){
            $scope.takePicture();
        }
        else{
            alert("limit exceed");
        }
    }

    $scope.takePicture = function() {
        var options = {
            quality : 75,
            destinationType : Camera.DestinationType.DATA_URL,
            sourceType : Camera.PictureSourceType.CAMERA,
            allowEdit : true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 200,
            targetHeight: 200,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };



        $cordovaCamera.getPicture(options).then(function(imageData) {

            var imgURI = "data:image/jpeg;base64," + imageData;

            $scope.images.push(imgURI);

        }, function(err) {
            // An error occured. Show a message to the user
        });

        console.log("length",$scope.images.length);

    }

});