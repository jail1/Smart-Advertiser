angular.module('smartPrice', [])

.controller('smartPriceController', ['$scope', function($scope) {
	$scope.products = {
		"Carte de vizita":    ["€ 90,00 ",		"€ 100,00 ",	"€ 120,00 ",	"€ 150,00 "	],
		"Banner":             ["€ 125,00 ",	"€ 150,00 ",	"€ 180,00 ",	"€ 200,00 "	],
		"Logo":                ["€ 80,00 ",		"€ 100,00 ",	"€ 120,00 ",	"€ 150,00 "	],
		"Catalog":             ["€ 250,00 ",	"€ 300,00 ",	"€ 320,00 ",	"€ 350,00 "	],
		"Mapa de prezentare ": ["€ 15,00 ",	 	"€ 20,00 ",		"€ 40,00 ",		"€ 50,00 "	],
		"Flyer":               ["€ 25,00 ",		"€ 30,00 ",		"€ 40,00 ",		"€ 50,00 "	],
		"Roll-up":            ["€ 150,00 ",	"€ 175,00 ",	"€ 200,00 ",	"€ 250,00 "	],
		"People stopper":      ["€ 45,00 ",		"€ 50,00 ",		"€ 65,00 ",		"€ 80,00 "	],
		"Poster":              ["€ 75,00 ",		"€ 100,00 ",	"€ 120,00 ",	"€ 150,00 "	],
		"Window stiker":      ["€ 20,00 ",		"€ 25,00 ",		"€ 35,00 ",		"€ 45,00 "	],
		"Ecuson":              ["€ 45,00 ",		"€ 50,00 ",		"€ 65,00 ",		"€ 80,00 "	],
		"Calendar":            ["€ 45,00 ",		"€ 50,00 ",		"€ 65,00 ",		"€ 80,00 "	],
		"Web Design":          ["€ 450,00 ",	"€ 500,00 ",	"€ 750,00 ",	"€ 950,00 "	],
		"Mententa site":       ["€ 450,00 ",	"€ 500,00 ",	"€ 750,00 ",	"€ 950,00 "	],
		"Campanii media":      ["€ 450,00 ",	"€ 500,00 ",	"€ 750,00 ",	"€ 950,00 "	],
		"Prelucrare imagine ": ["€ 5,00 ",		"€ 5,00 ",		"€ 10,00 ",		"€ 20,00 "	],
	};

	$scope.icons = {
		"Carte de vizita":     "credit-card",     
		"Banner":             "bookmark-o",     
		"Logo":                "diamond", 
		"Catalog":             "caret-square-o-up ",          
		"Mapa de prezentare ": "leanpub",
		"Flyer":               "building",         
		"Roll-up":            "rocket",
		"People stopper":      "deviantart",         
		"Poster":              "archive",
		"Window stiker":      "windows",         
		"Ecuson":              "certificate",         
		"Calendar":            "calendar",         
		"Web Design":          "globe",         
		"Mententa site":       "sitemap",         
		"Campanii media":      "camera",         
		"Prelucrare imagine ": "file-image-o",
	}
	
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
	$scope.productName = "Selectează produse! ";


	$scope.getProduct = function(key){
		$scope.productName = key;
		$scope.product     = $scope.products[key];
	}

	$scope.getTotalPrice = function(){
		$scope.totalPrice = 0;
		for( var i = 0; i < $scope.data.length; i++){
			var price = $scope.products[ $scope.data[i][0] ][ $scope.data[i][1] ];
			var quant = $scope.data[i][2];
			$scope.totalPrice += parseFloat(price.replace(/^\D+/g,'')) * quant ;
		}
		// $scope.totalPrice = $scope.totalPrice.toFixed(2) ;
		return $scope.totalPrice;
	}
	$scope.removeProduct = function(key){
		$scope.data.splice(key, 1);
		localStorage.products = JSON.stringify($scope.data);
	}
	$scope.processProduct = function(key){

		if($scope.productName === "Selectează produse! ") {
			$.prompt("Nu ați ales o gamă de produse! ");
		}

		price    = parseFloat($scope.product[key].replace(/^\D+/g,''));

		if(!$scope.taken[$scope.productName])
			$scope.taken[$scope.productName] = [];

		if(!$scope.taken[$scope.productName][key])
			$scope.taken[$scope.productName][key] = 0;

		if($scope.taken[$scope.productName][key] == 0){
			$scope.totalPrice += price;
			$scope.taken[$scope.productName][key] = 1;
		} else {
			$scope.totalPrice -= price;
			$scope.taken[$scope.productName][key] = 0;
		}
		$scope.data.push([ $scope.productName,key,1 ]);
		localStorage.products = JSON.stringify($scope.data);
	}

	// get data from local storage
	$scope.data           = JSON.parse(localStorage.products|| "[]");

	for(i in $scope.data){
		productName = $scope.data[i][0];
		key = $scope.data[i][1];
		if(!$scope.taken[ productName ])
			$scope.taken[ productName ] = [];

		if(!$scope.taken[productName][key])
			$scope.taken[productName][key] = 1;
	}


}]);

function onlynumbers(event) {
	if( event.ctrlKey || event.altKey
		|| (47<event.keyCode && event.keyCode<58 && event.shiftKey==false)
		|| (95<event.keyCode && event.keyCode<106)
		|| (event.keyCode==8) || (event.keyCode==9)
		|| (event.keyCode>=34 && event.keyCode<=40)
		|| (event.keyCode==46)
		|| (event.keyCode==110)
		|| (event.keyCode==190)
		|| (event.keyCode==189)
		)
		return true;
	event.preventDefault();
}
