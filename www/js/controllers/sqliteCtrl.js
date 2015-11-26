CodePushIonic.controller("sqliteCtrl", function($scope, $cordovaSQLite,$timeout) {

    select = function() {
        var query = "SELECT firstname, lastname FROM people";
        $cordovaSQLite.execute(db, query).then(function(res) {

            $scope.records= [];

            if(res.rows.length > 0) {

                for(var i =0; i< res.rows.length ; i++){

                    console.log("SELECTED -> " + res.rows.item(i).firstname + " " + res.rows.item(i).lastname);

                    $scope.first_name = res.rows.item(i).firstname;

                    $scope.last_name = res.rows.item(i).lastname;

                    $scope.records.push( $scope.first_name + " " + $scope.last_name);


                }
            } else {
                console.log("No results found");
            }
        }, function (err) {
            console.error(err);
        });
    }
    $timeout(function() {
        select();
    }, 3000);


    $scope.insert = function(firstname, lastname) {
        var query = "INSERT INTO people (firstname, lastname) VALUES (?,?)";
        $cordovaSQLite.execute(db, query, [firstname, lastname]).then(function(res) {
            console.log("INSERT ID -> " + res.insertId);

        }, function (err) {
            console.error(err);
        });
        $scope.firstname = "";
        $scope.lastname = "";
        select();

    }



});
