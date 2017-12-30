function carService ($http) {
	var service = {};

	service.getCars = getCars;
    service.removeCar = removeCar;
    service.editCar = editCar;
    service.getImages = getImages;
    service.removeImage = removeImage;

	return service;

	function getCars () {
		return $http.get("../../api/getCars.php")
			.then(function (response) {
				return response;
			}).catch(function (error) {
                return error;
            });
	};

    function getImages (car_id) {
        return $http.get("../../api/getImages.php?car_id=" + car_id)
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
        return $http.post("../../api/editCar.php", car)
            .then(function (response) {
                return response;
            }).catch(function (error) {
                return error;
            });
    };

    function removeImage(id) {
        return $http.post("../../api/removeImage.php", {id: id})
            .then(function (response) {
                return response;
            }).catch(function (error) {
                return error;
            });
    };
};

angular.module("app.car.service", [])
.factory("CarService", carService)