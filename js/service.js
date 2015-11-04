(function(){
angular
    .module('coaching')
    .service('dataService', dataService);
	
dataService.$inject = ['$http'];
	
function dataService($http) {
    var url = 'http://localhost:3000/users/';
    var service = {
        create: create,
        getData: getData,
        update: update,
		remove: remove
    };

    return service;

    function create(item) {
        return $http.post(url, item);
    };
	
	function getData(id) {
        if(id){
            return $http.get(url+id);
        }
        return $http.get(url);
    };

    function update(item) {
        return $http.put(url+item.id, item);
    };
	
	function remove(id) {
        return $http.delete(url+id);
    };
}

})();