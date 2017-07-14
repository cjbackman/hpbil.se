function carService ($http) {
	var service = {};

	service.getCars = getCars;
    service.removeCar = removeCar;

	return service;

	function getCars () {
		return $http.get("../../api/getCars.php")
			.then(function (response) {
				return response;
			}).catch(function (error) {
                return error;
            });
	};

    function removeCar (id) {
        return $http.post("../../api/removeCar.php", {id: id})
            .then(function (response) {
                return response;
            }).catch(function (error) {
                return error;
            });
    };

    function editCar(car) {

        console.log(car);

        /*
        return $http.post("../../api/updateCar.php", car)
        /*{
            id: car.id,
            brand: car.brand,
            model: car.model,
            year: car.year,
            milage: car.milage,
            price: car.price,
            color: car.color,
            misc: car.misc
        })
            .then(function (response) {
                return response;
            }).catch(function (error) {
                return error;
            });
            */
    };
};

angular.module("app.car.service", [])
.factory("CarService", carService)