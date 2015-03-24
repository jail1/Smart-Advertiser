angular.module('smartPrice', ['ngAnimate'])

.controller('smartPriceController', ['$scope', function($scope) {
	$scope.products = {
		"Badge":               ["€ 45,00 ",	 "€ 50,00 ",	 "€ 65,00 ",	 "€ 80,00 ", "€ 80,00 "],
		"Banner ":             ["€ 125,00 ",	 "€ 150,00 ",	 "€ 180,00 ",	 "€ 200,00 "],
		"Carte de vizita ":    ["€ 90,00 ",	 "€ 100,00 ",	 "€ 120,00 ",	 "€ 150,00 "],
		"Catalog":             ["€ 250,00 ",	 "€ 300,00 ",	 "€ 320,00 ",	 "€ 350,00 "],
		"Flyer":               ["€ 25,00 ",	 "€ 30,00 ",	 "€ 40,00 ",	 "€ 50,00 "],
		"Logo":                ["€ 80,00 ",	 "€ 100,00 ",	 "€ 120,00 ",	 "€ 150,00 "],
		"Mapa de prezentare ": ["€ 15,00 ",	 "€ 20,00 ",	 "€ 40,00 ",	 "€ 50,00 "],
		"Pop-up ":             ["€ 175,00 ",	 "€ 200,00 ",	 "€ 220,00 ",	 "€ 250,00 "],
		"Poster":              ["€ 75,00 ",	 "€ 100,00 ",	 "€ 120,00 ",	 "€ 150,00 "],
		"Prelucrare imagine ": ["€ 5,00 ",	 "€ 5,00 ",	 "€ 10,00 ",	 "€ 20,00 "],
		"Roll-up ":            ["€ 150,00 ",	 "€ 175,00 ",	 "€ 200,00 ",	 "€ 250,00 "],
		"Window stiker ":      ["€ 20,00 ",	 "€ 25,00 ",	 "€ 35,00 ",	 "€ 45,00 "],
		"Website":             ["€ 450,00 ",	 "€ 500,00 ",	 "€ 750,00 ",	 "€ 950,00 "]
	};
	
	$scope.taken = [];

	$scope.boxes =  [{
		name 		: "Bronze",
		content 	: [
			"Expect ~30 designs",
			"Good designers",
		]
	} , {
		name 		: "Silver",
		content 	: [
			"Expect ~60 designs",
			"Better designers",
		]
	} , {
		name 		: "Gold",
		content 	: [
			"Expect ~90 designs",
			"Expert designers",
			"Dedicated account manager",
		]
	} , {
		name 		: "Premium",
		content 	: [
			"Expect ~60 premium designs",
			"Exceptional designers",
			"Dedicated account manager"
		]

	}];
	
	$scope.product    = undefined;
	$scope.totalPrice = 0;
	$scope.productName = "Selectează produse! ";

	$scope.getProduct = function(key){
		$scope.productName = key;
		$scope.product     = $scope.products[key];
	}

	$scope.processProduct = function(key){

		if($scope.productName === "Selectează produse! ") {
			$.prompt("Nu ați ales o gamă de produse! ");
		}

		price    = parseFloat($scope.product[key].replace(/^\D+/g,''));
		
		if(!$scope.taken[$scope.productName])
			$scope.taken[$scope.productName] = [];
		console.log($scope.taken);

		if(!$scope.taken[$scope.productName][key])
			$scope.taken[$scope.productName][key] = 0;

		if($scope.taken[$scope.productName][key] == 0){
			$scope.totalPrice += price;
			$scope.taken[$scope.productName][key] = 1;
		} else {
			$scope.totalPrice -= price;
			$scope.taken[$scope.productName][key] = 0;
		}

	}

}]);

