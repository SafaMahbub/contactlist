var myApp = angular.module('myApp', []);

myApp.controller('AppCtrl', ['$scope', '$http', 
	function ($scope, $http){

		var refresh = function() {
			console.log("Message from Controller");

			$http.get('/contactlist').then(function(response) {
				console.log("Got Data");
				$scope.contactlist = response.data;
			});
		};

		refresh();
		/////Data created in controler on client side, then sent to index.html from the scope variale
		// person1 = {name: "Mark", email: "m@m.com", number: "(222)-222-2222"};
		// person2 = {name: "Lisa Simpson", email: "1@m.com", number: "(212)-222-2222"};
		// person3 = {name: "Bill", email: "b@m.com", number: "(222)-222-2223"};

		// contacts = [person1, person2, person3];
		// $scope.contactlist = contacts;
		/////////////////////////////////////////////////////////////////////////////////////////

	    $scope.addContact = function(){ 
    	console.log($scope.contact);       
	        $http.post('/contactlist', $scope.contact).then(function(response){
	            console.log(response);
	            refresh();
	        });
          };


        $scope.remove = function(id){
	        console.log(id);
	        $http.delete('/contactlist/' + id).then(function(response){
	            refresh();
	        });
	    };

	    $scope.edit = function(id) {
	    	console.log("id: " + id);
	    	$http.get('/contactlist/' + id).then(function(response) {
    			$scope.contact = response.data;
    			console.log($scope.contact);
  			});
	    };

	    $scope.update = function(){
        	console.log($scope.contact._id);
        	$http.put('/contactlist/' + $scope.contact._id, $scope.contact).then(function(response){
        	    refresh();
        	});
    	};

    	$scope.deselect = function(){
    	    $scope.contact = null;
    	};



}]);











